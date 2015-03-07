var Tool = {
  active: "pen",
  pen: {
    down : function($square){
      var num = NumberPallet.active;
      if ( !$square.isPermanent() && num) {
        if($square.isInPen() && $square.hasNumber(num) ) {
          $square.markWithPen( "" );
        }else{
          $square.markWithPen( NumberPallet.active );
          $square.trigger("markedWithPen");
          // NumberPallet.boldEachActive();
          // // trigger 
          // Puzzle.highlightCollision($square.squareNumber(), +num);
          // //trigger here
        }
      }
    },
    enter: function($square){ },

  },
  pencil: {
    down : function($square){
      if ( !$square.isPermanent() && NumberPallet.active) {
        $square.markWithPencil( NumberPallet.active );
      }
    },
    enter: function($square){ },

  },
  eraser: {
    down : function($square){
      if($square.isHighlighted() ){
        $square.clearHighlighter();
      } else if( !$square.isPermanent() ) {
        $square.erase(); 
      }
    },
    enter: function($square){
      if( Mouse.isDown ){
        $square.clearHighlighter();
      }
    },
    doubleClick: function() {
      $('.square').each( Tool.squareHelpers.clearHighlighter );
    }
  },
  redHighlighter: {
    down : function($square){
      $square.markWithHighlighter("red");
    },
    enter: function($square){
      if ( Mouse.isDown ) {
        $square.markWithHighlighter("red");
      }
    },
  },
  blueHighlighter: {
    down : function($square){
      $square.markWithHighlighter("blue");
    },
    enter: function($square){
      if ( Mouse.isDown ) {
        $square.markWithHighlighter("blue");
      }
    },
  },
  
  squareHelpers: {
    setToolmark: function(tool) {
      $(this).removeClass("pen pencil");
      $(this).addClass(tool);
    },
    addToolmark: function(tool) {
      $(this).addClass(tool);
    },
    isInPencil: function() {
      return $(this).hasClass("pencil");
    },
    isInPen: function() {
      return $(this).hasClass("pen");
    },
    isHighlighted: function() {
      return $(this).hasClass("blueHighlighter") || $(this).hasClass("redHighlighter");
    },
    markWithPen: function(number) {
      $(this).setToolmark("pen");
      $(this).find('.square-text').text(number);
    },
    markWithPencil: function(number) {
      $(this).setToolmark("pencil");
      var obj = $(this).find('.pencil-' + number);
      if(obj.text() == number) {
        obj.text("");
      } else {
        obj.text(number);
      }
    },
    markWithHighlighter: function(color){
      $(this).addToolmark(color + "Highlighter");
    },
    clearHighlighter: function(){
      $(this).removeClass("redHighlighter blueHighlighter");
    },
    erase: function() {
      $(this).clearHighlighter();
      if ($(this).isInPen() ) {
        $(this).find('.square-text').text("");
      }
      if ($(this).isInPencil() ){
        $(this).find('.pencil-text').text("");        
      }
    },
    isPermanent: function() {
      return $(this).hasClass("permanent");
    },
    hasNumber: function(number) {
      var text = "";
      if ( $(this).isInPencil() ) {
        text = $(this).find('.pencil-container').text();
      } else {
        text = $(this).find('.square-text').text();
      }
      return text.indexOf(number) != -1;
    },
    squareNumber: function() {
      return +$(this).attr('id').replace("square-","");
    }
  },
  controlHelpers: {
    setActiveTool: function() {
      $('.tool').removeClass('active');
      this.addClass('active');
      Tool.active = this.toolName();
    },
    toolName: function () {
      return $(this).attr('id');
    },
  }
};

// once the page has loaded, all bindings are made and the text size
// is set appropriately.
$(document).on('ready', function(){
  
  // this line makes the bindings only work on the games show... sloppy but
  // you'd be surprised how ugly all the other solutions are too.
  if( !$('body').hasClass('controller-games action-show') ){ return; }
  
  $.fn.extend(Tool.squareHelpers);
  $.fn.extend(Tool.controlHelpers);
  
  $('.square').on("touchstart mousedown", function(e) { 
    e.preventDefault();
    Tool[ Tool.active ].down( $(this) ); 
  });
  
  $('.square').on("mouseenter", function() { 
    Tool[ Tool.active ].enter( $(this) );
  });
  
  $('.tool').on("touchstart mousedown", function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).setActiveTool();
  });
  
  $('#eraser').on("dblclick", Tool.eraser.doubleClick);
});
