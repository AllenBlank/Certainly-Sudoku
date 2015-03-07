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
  $('.splash-foreground a').on('mousedown', Splash.splashOff);
  
  $('#signin-link').on('mousedown', function(){
    Splash.splashOn('sign-in-splash');
    $("button.navbar-toggle").trigger('click');
  });
  
  
  // this line makes the bindings only work on the games show... sloppy but
  // you'd be surprised how ugly all the other solutions are too.
  if( !$('body').hasClass('controller-games action-show') ){ return; }
  
  $(document).on("puzzleSolved", function(){
    Splash.splashOn('completion-splash');
  });
});