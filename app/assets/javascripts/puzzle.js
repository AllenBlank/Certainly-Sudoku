var mouseDown = false;
var currentTool = 'none';
var currentNum  = 'none';

// resize the text when the window is resized, and when the document loads

var resize_ratio = 0.75;

var resize = function() {
    var resize_size = $('.square-text').parent().width();
    $('.square-text').css('font-size', resize_size * resize_ratio);
    $('.penciled .square-text').css('font-size', resize_size * resize_ratio * 0.33);
};

// action bindings (clicks, mouseovers etc)
function handleSquareMouseEnter ($square) {
    if ( mouseDown && textContains(currentTool, "highlighter")){
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
    if (isChangeable($square)) {
        clearTooledClasses($square);
        $square.find('.square-text').text("");
    }
}

function writePen($square) {
    if (isChangeable($square) && numSelected()) {
        $square.addClass("penned");
        setSquareText($square, currentNum);
    }
}

function writePencil ($square) {
    if (numSelected() && !(isInPen($square) || isPermanent($square)) ) {
        $square.addClass("penciled");
        var text = getSquareText($square);
        var num = currentNum.concat(" ");
        if (textContains(text, num)){
            text = text.replace(num, "");
        } else {
            text = text.concat(num);
        }
        setSquareText($square, text);
    }
}

// Helper methods to make the code more readable

function isPermanent($square) {
    return $square.hasClass("permanent");
}

function isChangeable($square) {
    return !isPermanent($square);
}

function isInPen($square) {
    return $square.hasClass("penned");
}

function isInPencil($square) {
    return $square.hasClass("penciled");
}

function numSelected() {
    return currentNum !== "none";
}

function textContains(string1, string2) {
    return string1.indexOf(string2) >= 0;
}


function getSquareText($square) {
    return $square.find('.square-text').text();
}
function setSquareText($square, textToSet) {
    $square.find('.square-text').text(textToSet);
    resize();
}

function clearTooledClasses($square) {
    $square.removeClass('penned');
    $square.removeClass('penciled');
}

// The event bindings for the puzzle, clicking, resizing and so forth...

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