var topPos = 0;
var leftPos = 0;

$(window).on('keydown', function(evt) {
    console.log(evt.which)
    switch (evt.which) {
        case 65:
            movePlayer("left");
            break;

        case 87:
            movePlayer("up");
            break;

        case 68:
            movePlayer("right");
            break;

        case 83:
            movePlayer("down");
            break;

        case 81:
            movePlayer("diagl");
            break;
        
        case 69:
            movePlayer("diagr");
            break;

        default:
            console.log("unsupported key was pressed");
    }
});

function movePlayer(direction) {
    switch (direction) {
        case 'left':
            leftPos -= 20;
            break;

        case 'up':
            topPos -= 20;
            break;

        case 'right':
            leftPos += 20;
            break;

        case 'down':
            topPos += 20;
            break;

        case 'diagl':
            leftPos -= 20;
            topPos -= 20;
            break;
        
        case 'diagr':
            leftPos += 20;
            topPos -= 20;

            break;
    }

    if (leftPos < 0) leftPos = 0;
    if (leftPos > 620) leftPos = 620;
    if (topPos < 0) topPos = 0;
    if (topPos > 620) topPos = 620;

    $('#player').css({
        "top": topPos + 'px',
        "left": leftPos + 'px',
    });
}