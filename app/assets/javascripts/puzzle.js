var mouseDown = false;
var currentTool = 'none';
var currentNum  = 'none';

// resize the text when the window is resized, and when the document loads

var resize_ratio = 0.75;

var resize = function() {
    var resize_size = $('.square-text').parent().width();
    $('.square-text').css('font-size', resize_size * resize_ratio);
};


function handleSquareMouseEnter ($square) {
    if ( mouseDown && currentTool.indexOf("highlighter") != -1){
        highlight($square);
    }
}

function handleSquareClick ($square) {
    if (currentTool.indexOf("highlighter") != -1) {
        highlight($square)
    }
}

function handleToolClick ($tool) {
    $('.image-container').removeClass('active');
    $tool.find('.image-container').addClass('active');
    currentTool = $tool.attr('id');
}

function handleNumberClick ($num) {
    $('.num-select').removeClass('active');
    $num.addClass('active');
    currentNum = $num.attr('id');
}

function highlight($square) {
    var color = currentTool.replace("-highlighter","");
    $square.addClass("highlighted-".concat(color));
}



var allBindings = function() { 
    
    //puzzle interaction bindings
    $(document).mouseup(function(){ mouseDown = false; });
    $(document).mousedown(function(){ mouseDown = true; });
    
    $( ".square" ).mouseenter(function() {
        var thisSquare = $(this);
        handleSquareMouseEnter(thisSquare);
    });
    
    // $( ".square" ).click(function() {
    //     var thisSquare = $(this);
    //     handleSquareClick(thisSquare);
    // });
    
    $( ".square" ).mousedown(function() {
        var thisSquare = $(this);
        handleSquareClick(thisSquare);
    });

    $( ".tool" ).click(function() {
        var thisTool = $(this);
        handleToolClick(thisTool);
    });
    
    $( ".num-select" ).click(function() {
        var thisNum = $(this);
        handleNumberClick(thisNum);
    });
    
    
    // resize bindings
    resize();
    $(window).on('resize orientationchange', resize);

};

$(document).ready(allBindings); // I guess I need two of these because turbolinks?
$(document).on('page:load', allBindings);