// Resizer Searches through the Page and resizes all numbers according to the
// size of the square containing them.

var Resizer = {
  
  textResizeRatio: 0.75,
  puzzleWidthHeigthRatio: 0.75,
  
  resize: function() {
    var windowHeight = $(window).height() - 50;
    this.setPuzzleWidth( windowHeight * this.puzzleWidthHeigthRatio);
    this.resizeText();
  },
  setPuzzleWidth: function(width) {
    var windowWidth  = $(window).width();
    var x = (windowWidth - width) / 2;
    if (x < 0) { x = 10 }
    $('.outer').css("padding-left",x);
    $('.outer').css("padding-right",x);
  },
  resizeText: function() {
    var squareSize = $('.square').width();
    $('.square-text').css('font-size', squareSize * this.textResizeRatio);
    $('.pencil-text').css('font-size', squareSize * this.textResizeRatio * 0.33);
  }
};

var Square = {
  onMouseDown : function(e) { 
    e.preventDefault();
    //e.stopPropagation();
    Tool[Tool.active].down(  $(this) ); 
  },
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
    },
    squareNumber: function() {
      return +$(this).attr('id').replace("square-","");
    },
    
  }
};

var Puzzle = {
  board: {},
  setup: function() {
    for(var i = 0;i < 81; i++){
      this.board[i] = {};
      this.board[i].obj = $('#square-' + i);
      this.board[i].col = i % 9;
      this.board[i].row = Math.floor(i / 9);
      this.board[i].box = Math.floor( this.board[i].row / 3 ) * 3 + Math.floor(this.board[i].col / 3);
    }
    for(var i = 0;i < 81; i++){
      this.board[i].neighbors = [];
      for(var j = 0;j < 81; j++){
        if(j === i) continue;
        if(this.board[i].col === this.board[j].col ||
           this.board[i].row === this.board[j].row ||
           this.board[i].box === this.board[j].box 
           ) {
          this.board[i].neighbors.push(j);
        }
      }
    }
  },
  highlightCollision: function(squareNumber, markedNumber) {
    var neighbors = this.board[squareNumber].neighbors;
    for(var i = 0;i < neighbors.length; i++) {
      var j = neighbors[i];
      var neighbor = this.board[j].obj;      
      if(neighbor.hasNumber(markedNumber)){
        neighbor.addClass('collided');
        (function(neighbor){
          window.setTimeout(function(){ neighbor.removeClass('collided') }, 2000);
        }(neighbor));
      }
    }
  }
  
};

var Tool = {
  onMouseDown: function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).setActiveTool();
  },
  
  active: "pen",
  
  pen: {
    down : function($square){
      var num = NumberPallet.active;
      if ( !$square.isPermanent() && num) {
        if($square.isInPen() && $square.hasNumber(num) ) {
          $square.markWithPen( "" );
        }else{
          $square.markWithPen( NumberPallet.active );
          NumberPallet.boldEachActive();
          Puzzle.highlightCollision($square.squareNumber(), +num);
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
  onMouseDown: function(e) {
    e.preventDefault();
    e.stopPropagation();
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

  save: function() {
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
          complete: function(o) {console.log(o.responseJSON.completionTime);},
      });
    }
  }

};


// track mousedown, and some absurd wizardry to emulate functionality
// that should have always existed in touch events.
var Mouse = {
  isDown: false,
  clickedRecently: false,
  
  onMouseDown: function(e){ 
    Mouse.isDown = true;
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
    Mouse.clickedRecently = true;
    window.setTimeout(function(){
      Mouse.clickedRecently = false;
    },300);
  }
  
};

// resize the text on a window adjustment


// once the page has loaded, all bindings are made and the text size
// is set appropriately.
$(document).on('page:load ready', function(){
  
  // this line makes the bindings only work on the games show... sloppy but
  // you'd be surprised how ugly all the other solutions are too.
  if( !$('body').hasClass('controller-games action-show') ){ return; }
  
  Puzzle.setup();
  
  $(window).on('orientationchange resize', function() {Resizer.resize();} );  
  Resizer.resize();
  
  $.fn.extend(NumberPallet.helpers);
  $.fn.extend(Square.helpers);
  $.fn.extend(Tool.helpers);
  
  $(document).on("touchstart mousedown", Mouse.onMouseDown);
  $(document).on("touchend mouseup",   Mouse.onMouseUp);
  $('.tool').on("touchstart", Mouse.emulateDoubleClick );
  document.addEventListener('touchmove', Mouse.emulateMouseEnter, false);
  
  $('.square').on("touchstart mousedown", Square.onMouseDown);
  $('.square').on("mouseenter", Square.onMouseEnter);
  $('.num-select').on("touchstart mousedown", NumberPallet.onMouseDown);
  $('.tool').on("touchstart mousedown", Tool.onMouseDown);
  $('#eraser').on("dblclick", Tool.eraser.doubleClick);
  
  $('#save-button').on('mousedown', function() { 
    BoardState.save(); 
    $("button.navbar-toggle").trigger('click');
  });
  clearInterval(saveInterval);
  var saveInterval = setInterval(function() { BoardState.save(); }, 120000);
  
  $('#dingdong').on('click', function(){alert('ring'); });
});

// for testing
function fillPuzzle (str) {
  var arr = str.split('');
  for(var i = 0; i < 81;i++){
    var square = $('#square-'+i);
    if(!square.isPermanent()){
      square.markWithPen(arr[i]);
    }
  }
}

// for spash nonsense

var Splash = {
  helpers: {
    center: function() {
      this.css("position","absolute");
      // Take a moment to appreciate that the next two lines ended up being the same length.
      this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 3) + $(window).scrollTop()) + "px");
      this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
      return this;
    }
  },
  splashOn: function(id) {
    $(".splash-background").fadeIn(300);
    $("#" + id).center().fadeIn(300);
  },
  splashOff: function() {
    $(".splash-background").fadeOut(300);
    $(".splash-foreground").fadeOut(300);
  }
};

$(document).on('ready', function() {
  $.fn.extend(Splash.helpers);
  $('.splash-background').on('mousedown', Splash.splashOff);
  $('#signin-link').on('mousedown', function(){
    Splash.splashOn('sign-in-splash');
    $("button.navbar-toggle").trigger('click');
  });
});