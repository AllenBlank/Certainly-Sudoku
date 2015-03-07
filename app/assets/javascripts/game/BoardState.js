var BoardState = {
  
  current: {},
  lastSaveType: "",

  generate: function() {
    var data = {};
    data.boardState = {};
    data.solution = "";
    
    for(var i = 0; i < 81; i++){
        var square = $('#square-' + i);
        
        var squareText = square.find('.square-text').text();
        var pencilText = square.find('.pencil-container').text();
        var pencilMarks = "";
        
        data.solution += squareText;
        
        var classes = square.attr('class');
        
        for(var j = 1; j < 10; j++){
          var num = "" + j;
          if(pencilText.indexOf(num) != -1){
            pencilMarks += num;
          }
        }
        
        data.boardState[i] = {
            classes: classes,
            text: squareText,
            pencilMarks: pencilMarks
        };
    }
    
    this.current = data;  
    return data;
  },

  save: function(saveType) {
    saveType = typeof saveType !== 'undefined' ? saveType : "auto";
    this.lastSaveType = saveType;
    
    var oldState = JSON.stringify( this.current );
    var newState = JSON.stringify( this.generate() );
    
    if(newState !== oldState){
      $.ajax({
          type: 'PATCH',
          data: newState,
          contentType: "application/json",
          asynch: false,
          error:    function() {console.log('error');},
          sucess:   function() {console.log('success');},
          complete: function(o) {BoardState.completeSave(o.responseJSON); },
      });
    }
  },
  completeSave: function(responseJSON) {
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
  
  $('#save-button').on('mousedown', function() { 
    BoardState.save("manual"); 
    $("button.navbar-toggle").trigger('click');
  });
  clearInterval(saveInterval);
  var saveInterval = setInterval(function() { BoardState.save("auto"); }, 120000);
});