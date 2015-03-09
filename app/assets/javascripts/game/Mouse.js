// track mousedown, and some absurd wizardry to emulate functionality
// that should have always existed in touch events.
var Mouse = {
  isDown: false,
  clickedRecently: false,
  
  onMouseDown: function(e){ 
    Mouse.isDown = true;
    Mouse.clickedRecently = true;
    setTimeout(function(){
      Mouse.clickedRecently = false;
    },300);
  },
  onMouseUp:   function(e){ 
    Mouse.isDown = false;
  },
  emulateMouseEnter: function(e) {
    e.preventDefault();
    if(Mouse.isDown) {
      var touch = e.touches[0];
      var element = document.elementFromPoint(touch.pageX, touch.pageY);
      //$('.navbar-brand').text($(element).attr('class'));
      $(element).trigger('mouseenter');
    }
  },
  emulateDoubleClick: function() {
    if( Mouse.clickedRecently ) {
      $(this).trigger('dblclick');
    }
    return true;
  },
  clickOrTouch: function() {
    if( !Mouse.clickedRecently ) {
      $(this).trigger('clickOrTouch');
    }
  },
  discreteClick: function() {
    if( Mouse.clickedRecently ) {
      $(this).trigger('discreteClick');
    }
  }
  
};

$(document).on('ready', function(){
  
  
  // this line makes the bindings only work on the games show... sloppy but
  // you'd be surprised how ugly all the other solutions are too.
  if( !$('body').hasClass('controller-games action-show') ){ return; }
  
  $(document).on("touchstart mousedown", Mouse.onMouseDown);
  $(document).on("touchend mouseup",   Mouse.onMouseUp);
  
  //$('.square').on('touchstart mousedown', Mouse.clickOrTouch);
  //$('.square').on('mouseup', Mouse.discreteClick);
  
  $('.tool').on("touchstart mousedown", Mouse.emulateDoubleClick );
  // 'on' doesn't seem to work quite right, the false there at the end changes
  // the way the event propagates.
  $('.inner').get(0).addEventListener('touchmove', Mouse.emulateMouseEnter, false);
  
});