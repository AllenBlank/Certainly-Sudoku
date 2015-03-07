// Resizer fixes the puzzle size given the screen height
// and it adjusts the text size based on the squaresize (scaled to the puzzle)

var Resizer = {
  
  textResizeRatio: 0.75,
  puzzleWidthHeigthRatio: 0.75,
  minWidth: 350,
  
  resize: function() {
    var windowHeight = $(window).height() - 50;
    this.setPuzzleWidth( Math.max(Resizer.minWidth, windowHeight * this.puzzleWidthHeigthRatio) );
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

// when ready

$(document).on('ready', function(){
  
  // this line makes the bindings only work on the games show... sloppy but
  // you'd be surprised how ugly all the other solutions are too.
  if( !$('body').hasClass('controller-games action-show') ){ return; }
  
  // trigger once when the page loads
  Resizer.resize();
  
  // and again whenver there's a windwow size or orientation change
  $(window).on('orientationchange resize', function() {
    Resizer.resize();
  });
  
});