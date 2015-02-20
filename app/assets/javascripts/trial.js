var mouseDown = false;

var Square = {
  onMouseDown : function(){ Tool[Tool.active].down(this)  },
  onMouseEnter: function(){ Tool[Tool.active].enter(this) },
  
  helpers: {
    isInPencil: function() {
      return this.hasClass("pencil");
    },
    isInPen: function() {
      return this.hasClass("pen");
    },
    isHighlighted: function() {
      return this.hasClass("highlighter");
    },
    isPermanent: function() {
      return this.hasClass("permanent");
    }
  }
}

var Tool = {
  onMouseDown: function() {
    this.setActiveTool();
  },
  
  active: "",
  
  pen: {
    down : function(sq){
      if ( !sq.isPermanent() ) {
        sq.setToolmark("pen");
        
      }
    },
    enter: function(sq){ },
    number: function() { }
  },
  pencil: {
    down : function(sq){ },
    enter: function(sq){ },
    number: function() { }
  },
  eraser: {
    down : function(sq){ },
    enter: function(sq){ },
    number: function() { }
  },
  redHighlighter: {
    down : function(sq){ },
    enter: function(sq){ },
    number: function() { }
  },
  blueHighlighter: {
    down : function(sq){ },
    enter: function(sq){ },
    number: function() { }
  },
  
  helpers: {
    setActiveTool: function() {
      $('.tool').removeClass('active');
      this.addClass('active');
      Tool.active = this.toolName();
    },
    toolName: function () {
      return this.attr('id');
    },
    setToolmark: function(tool) {
      this.removeClass("pen pencil eraser redHighlighter blueHighlighter");
      this.addClass(tool);
    },
    addToolmark: function(tool) {
      this.addClass(tool);
    }
  }
};

var NumberPallet = {
  onMouseDown: function() {
    this.setActiveNumber();
    Tool[Tool.active].number(this);
  },
  
  active: "",
  
  helpers: {
    setActiveNumber: function() {
      $(".pallet-number").removeClass('active');
      this.addClass('active');
      NumberPallet.active = this.attr('id');
    }
  }
};

