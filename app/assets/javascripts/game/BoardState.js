// so this is a bit tricksy.
// A JSON object is created by the generate method that can be 
// used to recreate the state of a board in a game (highlights, pencil and pen marks, etc.)

// The save method checks to see if there has been a change since the last attempt
// to save and does nothing if it hasn't.
// if there has been a change it shoots the boardstate off as a JSON object in a patch request
// that's handled by the Update method of the games controller and saved in the database
// so that the boardstate can be accurately recreated the next time the game is visited.

// The completesave function is fired off with a successful save.
// if the puzzled was solved, the update method in the games controller will generate a JSON object
// with a solved property set to true and the completesave function will call the Splash generator
// and pop up a little congratulations for the user.

// When the user navigates away from the game if there has been changes made since the last save 
// it sends the AJAX request and pops up a confirmation box... The box seems to be required (on chrome at least)
// to hold onto the page while the request is sent. There's probably some way to do it with sockets
// but forget that noise.
var BoardState = {
  
  // the last boardstate generated
  current: {},
  // the last method used to save the game
  lastSaveType: "",
  // if we've currently got an ajax request going.
  saving: false,

  generate: function() {
    var data = {};
    data.boardState = {};
    data.solution = "";
    
    // for each square
    for(var i = 0; i < 81; i++){
        var square = $('#square-' + i);
        
        // see gather it's pencil marks and pen marks
        var squareText = square.find('.square-text').text();
        var pencilText = square.find('.pencil-container').text();
        var pencilMarks = "";
        
        data.solution += squareText;
        
        // all of it's classes (highlighter and bold statuses)
        var classes = square.attr('class');
        
        // seperate out the crap and whitespace for the pencilmarks if any
        for(var j = 1; j < 10; j++){
          var num = "" + j;
          if(pencilText.indexOf(num) != -1){
            pencilMarks += num;
          }
        }
        
        // save all that to the JSON object
        data.boardState[i] = {
            classes: classes,
            text: squareText,
            pencilMarks: pencilMarks
        };
    }
    
    // return the object and save it in the current property.
    this.current = data;  
    return data;
  },

  // takes one parameter "saveType" should be auto, manual or exit 
  save: function(saveType) {
    // if we're already sending a request, forget the whole deal.
    if (BoardState.saving) {return;}
    // set the default savetype to auto.
    saveType = typeof saveType !== 'undefined' ? saveType : "auto";

    // save the old savetype for comparison
    var oldSaveType = this.lastSaveType;
    this.lastSaveType = saveType;
    
    // stringify and save the old and new boardstates for easy equivalence check
    var oldState = JSON.stringify( this.current );
    var newState = JSON.stringify( this.generate() );
    
    // if either the boardstate or the savetype is different from the last, send the update request
    if( (newState !== oldState) || (saveType === 'manual' ) ){
      $.ajax({
          type: 'PATCH',
          data: newState,
          contentType: "application/json",
          //asynch: false,
          beforeSend: function() {
            // mark that we're starting the request.
            BoardState.saving = true;
          },
          error:    function() {
            console.log('error');
            // mark that the request is over
            BoardState.saving = false;
          },
          sucess:   function() {console.log('success');},
          complete: function(o) {BoardState.completeSave(o.responseJSON); },
      });
      // if you manually save, trigger on saved actions (highlight all collisions).
      if(saveType === "manual") { $(document).trigger('puzzleSaved'); }
      
      return "Saving your progress...";
    }
  },
  completeSave: function(responseJSON) {
    // mark that the request is over
    BoardState.saving = false;
    
    // if the last save solved the puzzle, and it was a manual save, display a
    // grats screen.
    if(responseJSON.solved == "true" && BoardState.lastSaveType == "manual"){
      // this is a little stringy
      $('#completion-time').text( responseJSON.completionTime );
      $(document).trigger("puzzleSolved");
    }
  }
};

$(document).on('ready', function(){
  
  // this line makes the bindings only work on the games show... sloppy but
  // you'd be surprised how ugly all the other solutions are too.
  if( !$('body').hasClass('controller-games action-show') ){ return; }
  
  // when the save button is clicked, save the game and close the opened menu.
  $('#save-button').on('mousedown', function() { 
    BoardState.save("manual"); 
    $("button.navbar-toggle").trigger('click');
  });
  
  // save every 2 minutes, we use the clearInterval and the variable here to prevent it from
  // being fired off multiple times...
  BoardState.generate();
  clearInterval(saveInterval);
  var saveInterval = setInterval(function() { BoardState.save("auto"); }, 120000);
  
  // you'll see the save function returns some text if it sends the ajax request.
  // in chrome, (maybe in other browsers? I dunno) returning a string in the before unload
  // triggers a confirm and it's the only way to do so.
  // the confirm has to be up for the ajax request to fire off completely, so far as I can tell.
  // not a perfect solution
  var saveOnLeave = function() { 
    return BoardState.save("exit");
  };
  $(window).unload(saveOnLeave);
  window.onbeforeunload = saveOnLeave;
});