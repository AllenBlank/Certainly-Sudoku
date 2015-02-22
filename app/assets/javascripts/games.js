// Resizer Searches through the Page and resizes all numbers according to the
// size of the square containing them.

var Resizer = {
  
  resizeRatio: 0.75,

  resize: function() {
    var squareSize = $('.square').width();
    $('.square-text').css('font-size', squareSize * this.resizeRatio);
    $('.pencil-text').css('font-size', squareSize * this.resizeRatio * 0.33);
  }
};

var Square = {
  onMouseDown : function() { Tool[Tool.active].down(  $(this) ) },
  onMouseEnter: function() { Tool[Tool.active].enter( $(this) ) },
  
  helpers: {
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
    }
  }
};

var Tool = {
  onMouseDown: function() {
    $(this).setActiveTool();
  },
  
  active: "pen",
  
  pen: {
    down : function($square){
      if ( !$square.isPermanent() && NumberPallet.active) {
        $square.markWithPen( NumberPallet.active );
        NumberPallet.boldEachActive();
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
      $('.square').each( Tool.helpers.clearHighlighter );
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
  
  helpers: {
    setActiveTool: function() {
      $('.tool').removeClass('active');
      this.addClass('active');
      Tool.active = this.toolName();
    },
    toolName: function () {
      return $(this).attr('id');
    },
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
    }
    
  }
};

var NumberPallet = {
  onMouseDown: function() {
    $(this).setActiveNumber();
    NumberPallet.boldEachActive();
  },
  boldEachActive: function() {
      $('.square').removeClass('bold');
      $('.square').each( NumberPallet.helpers.boldIfActive );
  },
  
  active: "",
  
  helpers: {
    setActiveNumber: function() {
      var thisNumber = $(this).attr('id').replace("num-select-","");
      NumberPallet.active = thisNumber;
      
      $(".num-select").removeClass('active');
      $(this).addClass('active');
    },
    boldIfActive: function() {
      if($(this).hasNumber( NumberPallet.active ) ) {
        $(this).addClass('bold');
      }
    },
  }
};

var BoardState = {
  
  current: {},
  
  save: function() {
    var gameID = $('.puzzle').attr('id').replace('game-','');
    this.generate();
    this.sendJSON('/games/' + gameID, 'PATCH', this.current);
  },

  generate: function() {
    var data = {};
    data.boardState = {};
    
    for(var i = 0; i < 81; i++){
        var square = $('#square-' + i);
        
        var pencilText = square.find('.pencil-container').text();
        var pencilMarks = "";
        
        var classes = square.attr('class');
        classes = classes.replace('thick-top', '');
        classes = classes.replace('thick-left', '');
        classes = classes.replace('thick-right', '');
        classes = classes.replace('thick-bottom', '');
        classes = classes.replace('square', '');
        
        for(var j = 1; j < 10; j++){
          var num = "" + j;
          if(pencilText.indexOf(num) != -1){
            pencilMarks += num;
          }
        }
        
        data.boardState[i] = {
            classes: classes,
            text: square.find('.square-text').text(),
            pencilMarks: pencilMarks
        };
    }
    
    this.current = data;  
    return data;
  },

  sendJSON: function(url,method,data) {
    $.ajax({
        url: url,
        type: method,
        data: JSON.stringify(data),
        contentType: "application/json",
    });
  }

};


//track mousedown
var Mouse = {
  isDown: false,
  
  onMouseDown: function(){ Mouse.isDown = true;},
  onMouseUp:   function(){ Mouse.isDown = false;}
};

// resize the text on a window adjustment
$(window).on('orientationchange resize', function() {Resizer.resize();} );

// once the page has loaded, all bindings are made and the text size
// is set appropriately.
$(document).on('page:load ready', function(){
  
  Resizer.resize();
  

  $.fn.extend(NumberPallet.helpers);
  $.fn.extend(Square.helpers);
  $.fn.extend(Tool.helpers);
  
  $(document).on("mousedown", Mouse.onMouseDown);
  $(document).on("mouseup",   Mouse.onMouseUp);
  
  $('.square').on("mousedown", Square.onMouseDown);
  $('.square').on("mouseenter", Square.onMouseEnter);
  $('.num-select').on("mousedown", NumberPallet.onMouseDown);
  $('.tool').on("mousedown", Tool.onMouseDown);
  $('#eraser').on("dblclick", Tool.eraser.doubleClick);
  
});