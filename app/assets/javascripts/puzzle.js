var resize_ratio = 0.75;

var resize = function() {
    var resize_size = $('.square-text').parent().width();
    $('.square-text').css('font-size', resize_size * resize_ratio);
};

$(window).on('resize orientationchange', resize);
$(document).ready(resize); // I guess I need two of these because turbolinks?
$(document).on('page:load', resize);