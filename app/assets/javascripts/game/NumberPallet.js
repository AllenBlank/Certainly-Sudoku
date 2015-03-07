var NumberPallet = {
  onMouseDown: function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).setActiveNumber();
    NumberPallet.boldEachActive();
  },
  boldEachActive: function() {
      $('.square').removeClass('bold');
      $('.square').each( NumberPallet.controlHelpers.boldIfActive );
  },
  
  active: "",
  
  controlHelpers: {
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

$(document).on('ready', function(){
  
  // this line makes the bindings only work on the games show... sloppy but
  // you'd be surprised how ugly all the other solutions are too.
  if( !$('body').hasClass('controller-games action-show') ){ return; }
  
  $.fn.extend(NumberPallet.controlHelpers);
  $('.num-select').on("touchstart mousedown", NumberPallet.onMouseDown);
  $('.square').on("markedWithPen", NumberPallet.boldEachActive);
});