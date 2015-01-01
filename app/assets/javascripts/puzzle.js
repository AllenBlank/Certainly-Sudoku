var mouseDown = false;
var currentTool = 'none';
var currentNum  = 'none';

// resize the text when the window is resized, and when the document loads

var resize_ratio = 0.75;

var resize = function() {
    var resize_size = $('.square-text').parent().width();
    $('.square-text').css('font-size', resize_size * resize_ratio);
};

// action bindings (clicks, mouseovers etc)
function handleSquareMouseEnter ($square) {
    if ( mouseDown && currentTool.indexOf("highlighter") != -1){
        highlight($square);
    } else
    if ( mouseDown && currentTool == "eraser") {
        erase($square, "onlyHighlight")
    }
}

function handleSquareClick ($square) {
    console.log(currentNum);
    if (currentTool.indexOf("highlighter") != -1) {
        highlight($square);
    } else
    if (currentTool == "eraser") {
        erase($square);
    } else
    if (currentTool == "pen") {
        writePen($square);
    } else
    if (currentTool == "pencil") {
        writePencil($square);
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
    currentNum = $num.attr('id').replace("num-select-","");
}


// tool actions
function highlight($square) {
    var color = currentTool.replace("-highlighter","");
    $square.addClass("highlighted highlighted-".concat(color));
}

function erase($square, option){
    if ( $square.hasClass("highlighted") ) {
        $square.removeClass("highlighted highlighted-red highlighted-blue");
    } else
    if (option == "onlyHighlight") { return; } else
    if ($square.hasClass("permanent") === false) {
        $square.removeClass("penned");
        $square.find('.square-text').text("");
    }
}

function writePen($square) {
    if ($square.hasClass("permanent") === false && currentNum !== 'none') {
        $square.addClass("penned");
        $square.find('.square-text').text(currentNum);
    }
}

function writePencil ($square) {
    
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

    $( ".tool" ).mousedown(function() {
        var thisTool = $(this);
        handleToolClick(thisTool);
    });
    
    $( ".num-select" ).mousedown(function() {
        var thisNum = $(this);
        handleNumberClick(thisNum);
    });
    
    
    // resize bindings
    resize();
    $(window).on('resize orientationchange', resize);

};

$(document).ready(allBindings); // I guess I need two of these because turbolinks?
$(document).on('page:load', allBindings);