// Binder takes a list of jQuery selectors, events and handlers and creates triggers.
// Binder.bindings is the list (an array).
// Binder.addBinding(selector term, event, handler) is the method used to add to the list tersely.
// Binder.bind is the function to add all the triggers and uses a closure (jesus christ that took a minute)
var Binder = {
  
  bindings: [],
  
  addBinding: function(term, event, handler) {
    this.bindings.push({
      term: term,
      event: event,
      handler: handler
    });    
  },
  
  bind: function() {
    for(var i = 0;i < this.bindings.length; i++){
      var binding = this.bindings[i],
          obj = $( binding.term ),
          event = binding.event,
          handler = binding.handler,
          generateHandlerClosure = function(handler) {
            return function() { handler( $(this) ); };
          };
          
      obj.on(event, generateHandlerClosure(handler) );
    }
  }
};

// Resizer Searches through the Page and resizes all numbers according to the
//   size of the square containing them.
// Resizer.resizeRatio is the number the width of the square will be multiplied by
//   to determine the size of the regular text
// Resizer.squareSize() returns the width of the parent square.
// Resizer.resize() goes through and changes the text size of text within the squares
//   accordingly.

var Resizer = {
  
  resizeRatio: 0.75,
  
  squareSize: function(){ 
    return $('.square-text').closest('.square').width(); 
  },

  resize: function() {
    $('.square-text').css('font-size', this.squareSize() * this.resizeRatio);
    $('.penciled .square-text').css('font-size', this.squareSize() * this.resizeRatio * 0.33);
  }
};

var closedResize = function(){
  Resizer.resize();
};



Binder.addBinding(window, 'orientationchange resize', closedResize );

// once the page has loaded, all the non onload bindings are made and the text size
// is set appropriately.
$(document).on('page:load ready', function(){
  Binder.bind();
  Resizer.resize();
});

//Puzzle.fetchPuzzle(1);