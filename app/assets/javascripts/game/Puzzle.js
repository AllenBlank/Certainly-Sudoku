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
  },
  fill: function(str) {
    var arr = str.split('');
    for(var i = 0; i < 81;i++){
      var square = $('#square-'+i);
      if(!square.isPermanent()){
        square.markWithPen(arr[i]);
      }
    }
  }
};

$(document).on('ready', function(){
  
  // this line makes the bindings only work on the games show... sloppy but
  // you'd be surprised how ugly all the other solutions are too.
  if( !$('body').hasClass('controller-games action-show') ){ return; }
  
  Puzzle.setup();
  $('.square').on("markedWithPen", function(){
    Puzzle.highlightCollision($(this).squareNumber(), +NumberPallet.active);
  });
});