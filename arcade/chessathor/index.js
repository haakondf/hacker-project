var levelCounter = 0;
var moveCounter = 0;
var piecesCaptured = 0;
var checkPenalty = 0;

function getScore(){
    var subTotal = 100 + (levelCounter * 20) + (piecesCaptured * 5) - (moveCounter) - (checkPenalty * 2);
    console.log(subTotal)
    return subTotal;
}

var playerPiece = '<span class="player"><img src="./pics/bk.png" alt="" height="60px" ></span>';
$(".game").append(playerPiece);

var player = { 
    x: 4,
    y: 7, 
}

const X_MAX = 7;
const Y_MAX = 7;

var pieces = {'P': 'Pawn', 'N': 'Knight', 'B': 'Bishop', 'R': 'Rook'};
var obstacles = {'P': 'Pawn'};


// LEVELS

var level = [

// MAP

// K  - PLAYER
// G  - GOAL
// P  - PAWN
// "" - EMPTY SPACE

//  LEVEL 0
//    0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 ,        index
//    A , B , C , D , E , F , G , H ,        index
    [
    [" "," "," "," ","G"," "," "," "], // 8 - 0
    [" "," "," "," "," "," "," "," "], // 7 - 1
    [" "," "," "," "," "," "," "," "], // 6 - 2 
    [" "," "," "," "," "," "," "," "], // 5 - 3
    [" "," "," "," "," "," "," "," "], // 4 - 4
    [" "," "," "," "," "," "," "," "], // 3 - 5
    [" "," "," "," "," "," "," "," "], // 2 - 6
    [" "," "," "," "," "," "," "," "], // 1 - 7  
    ], 
    
//  LEVEL 1
//    0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 ,        index
//    A , B , C , D , E , F , G , H ,        index
    [
    [" "," "," "," ","G"," "," "," "], // 8 - 0
    [" "," "," "," "," "," "," "," "], // 7 - 1
    [" "," ","P"," "," ","P"," "," "], // 6 - 2 
    [" "," "," "," "," "," "," "," "], // 5 - 3
    [" "," "," "," "," "," "," "," "], // 4 - 4
    [" "," "," "," "," "," "," "," "], // 3 - 5
    [" "," "," "," "," "," "," "," "], // 2 - 6
    [" "," "," "," "," "," "," "," "], // 1 - 7  
    ],


// LEVEL 2
//    0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 ,        index
//    A , B , C , D , E , F , G , H ,        index
    [
    [" "," "," "," ","G"," "," "," "], // 8 - 0
    [" "," "," "," "," "," "," "," "], // 7 - 1
    [" "," ","P"," "," "," ","P"," "], // 6 - 2 
    [" "," "," ","P"," ","P"," "," "], // 5 - 3
    [" "," "," "," "," "," "," "," "], // 4 - 4
    [" "," "," "," "," "," "," "," "], // 3 - 5
    [" "," "," "," "," "," "," "," "], // 2 - 6
    [" "," "," "," "," "," "," "," "], // 1 - 7  
    ], 

//    LEVEL 3
//    0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 ,        index
//    A , B , C , D , E , F , G , H ,        index
    [
    ["P"," "," "," ","G"," "," "," "], // 8 - 0
    [" ","P"," "," "," "," "," ","P"], // 7 - 1
    [" "," ","P"," "," "," ","P"," "], // 6 - 2 
    [" "," "," ","P"," ","P"," "," "], // 5 - 3
    [" "," "," "," ","P"," "," "," "], // 4 - 4
    [" "," "," "," "," "," "," "," "], // 3 - 5
    [" "," "," "," "," "," "," "," "], // 2 - 6
    [" "," "," "," "," "," "," "," "], // 1 - 7  
    ], 

// LEVEL 4
//    0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 ,        index
//    A , B , C , D , E , F , G , H ,        index
    [
    [" "," "," "," "," "," "," "," "], // 8 - 0
    [" ","P"," "," "," "," "," "," "], // 7 - 1
    [" "," ","P"," "," "," "," ","G"], // 6 - 2 
    [" "," ","P"," "," "," "," "," "], // 5 - 3
    [" "," ","P","P","P","P","P","P"], // 4 - 4
    [" "," "," "," "," "," "," "," "], // 3 - 5
    [" "," "," "," "," "," "," "," "], // 2 - 6
    [" "," "," "," "," "," "," "," "], // 1 - 7  
    ], 
// LEVEL 4 TEXT: You're doing good! Let's introduce some time pressure!
// The red border(?) will kill your king    

// LEVEL 5

    [
    [" ","G"," "," "," "," "," "," "], // 8 - 0
    [" "," ","P","P","P","P","P","P"], // 7 - 1
    [" "," "," "," "," "," "," "," "], // 6 - 2 
    ["P","P","P","P","P","P"," "," "], // 5 - 3
    [" "," "," "," "," "," "," "," "], // 4 - 4
    [" "," ","P","P","P","P","P","P"], // 3 - 5
    [" "," "," "," "," "," "," "," "], // 2 - 6
    [" "," "," "," "," "," "," "," "], // 1 - 7  
    ], 
    
// LEVEL 5 TEXT: Well done!

    [
    [" "," "," "," ","G"," "," "," "], // 8 - 0
    [" "," ","P"," "," "," "," "," "], // 7 - 1
    [" "," "," "," ","P"," "," "," "], // 6 - 2 
    [" ","P"," "," ","P","P","P"," "], // 5 - 3
    [" "," "," "," "," "," "," ","P"], // 4 - 4
    [" "," ","P","P","P"," ","P"," "], // 3 - 5
    ["P","P","P","P"," "," "," "," "], // 2 - 6
    [" "," "," "," "," "," "," "," "], // 1 - 7  
    ],  


// LEVEL 6
    
    [
    [" ","G"," "," "," "," "," "," "], // 8 - 0
    [" "," "," "," "," "," "," "," "], // 7 - 1
    ["P","P","P"," ","P"," "," ","P"], // 6 - 2 
    [" ","P"," ","P"," ","P"," ","P"], // 5 - 3
    [" ","P"," ","P"," ","P","P","P"], // 4 - 4
    [" ","P"," "," ","P"," "," ","P"], // 3 - 5
    [" "," "," "," "," "," "," "," "], // 2 - 6
    [" "," "," "," "," "," "," "," "], // 1 - 7  
    ],

// LEVEL 7

    [
    [" "," "," "," ","G"," "," "," "], // 8 - 0
    [" "," "," ","P","P"," ","P","P"], // 7 - 1
    [" "," ","P"," ","P"," ","P"," "], // 6 - 2 
    ["P","P"," "," "," "," ","P"," "], // 5 - 3
    [" "," ","P","P"," "," ","P"," "], // 4 - 4
    [" "," "," "," "," ","P"," "," "], // 3 - 5
    [" "," "," "," "," "," "," "," "], // 2 - 6
    [" "," "," "," "," "," "," "," "], // 1 - 7  
    ], 

// LEVEL 8 FINAL LEVEL

    [
    [" "," "," "," ","G"," "," "," "], // 8 - 0
    [" "," "," "," "," "," "," "," "], // 7 - 1
    [" "," "," "," "," "," "," "," "], // 6 - 2 
    [" "," "," "," "," "," "," "," "], // 5 - 3
    [" "," "," "," "," "," "," "," "], // 4 - 4
    [" "," "," "," "," "," "," "," "], // 3 - 5
    [" "," "," "," "," "," "," "," "], // 2 - 6
    [" "," "," "," "," "," "," "," "], // 1 - 7  
    ],
    

// SCORE LEVEL
    [
    ["X","X","X","X","X","X","X","X"], // 8 - 0
    ["X","X","X","X","X","X","X","X"], // 7 - 1
    ["X","X","X","X","X","X","X","X"], // 6 - 2 
    ["X","X","X","X","X","X","X","X"], // 5 - 3
    ["X","X","X","X","X","X","X","X"], // 4 - 4
    ["X","X","X","X","X","X","X","X"], // 3 - 5
    ["X","X","X","X","X","X","X","X"], // 2 - 6
    ["X","X","X","X","X","X","X","X"], // 1 - 7  
    ],

]


// REFRESH THE BOARD
// This will automaticaly remove and recreate the divs for every move the player does
// there might solutions that could make this process better
 function refreshBoard(){
    
    $(".game div").remove();
    $('.player').css({
        "top": player.y * 80 + 'px',
        "left": player.x * 80 + 'px',
    
    });
    for (var i = 0; i < 8; i++){
        for (var j = 0; j < 8; j++){
            // ADDS TILES TO THE GAME BOARD 
            
            if (level[levelCounter][i][j] != "X"){
                var tiles = '<div id="t' + i + j + '"></div>';
                
                $(".game").append(tiles);
                

            }
            
            if (level[levelCounter][i][j] == "P"){
                $( "#t" + i + j ).addClass( "wp" );
                }
            
            if (level[levelCounter][i][j] == "G"){
                $( "#t" + i + j ).addClass( "gt" );
                if (i == player.y && j == player.x){
                    
                    $("#nextLevel").get(0).load();
                    $("#nextLevel").get(0).play();
                    levelCounter+=1;
                    initialPosition ();
                    refreshBoard();
                    bubbleText();
                    
                }
        }
                
        }
    }
    
}
refreshBoard()
bubbleText();

//KEY FUNCTIONS
$(window).on('keydown', function(evt) {
    switch (evt.which) {
        case 83:
            movePlayer("left");
            moveCounter++;
            getScore()
            break;

        case 69:
            movePlayer("up");
            moveCounter++;
            getScore()
            break;

        case 70:
            movePlayer("right");
            moveCounter++;
            getScore()
            break;

        case 68:
            movePlayer("down");
            moveCounter++;
            getScore()
            break;

        case 87:
            movePlayer("diagl");
            moveCounter++;
            getScore()
            break;
        
        case 82:
            movePlayer("diagr");
            moveCounter++;
            getScore()
            break;
        
        case 88:
            movePlayer("diagdl");
            moveCounter++;
            getScore()
            break;

        case 86:
            movePlayer("diagdr");
            moveCounter++;
            getScore()
            break;

        default:
            console.log("");
    }
});

// MOVE THE PLAYER AROUND FUNCTIONS

function movePlayer(direction) {
    switch (direction) {

        // LEFT LEFT LEFT LEFT 

        case 'left':
            if (player.x < 1) {
                console.log("out of bounds");
                break;
            }
            // THIS FUNCTION WILL MAKE THE PLAYER PIECE SEARCH AROUND HIM FOR EVERY SINGLE MOVE, LOOKING FOR OBSTACLES
            // THIS ONLY WORKS FOR PAWNS, AND SHOULD BE SEVERALY CHANGED IF OTHER PIECES WERE INTRODUCED TO THE GAME
            // IT'S A MESS, BUT IT WORKS.
            if (player.y > 1){
            var obstacle = level[levelCounter][player.y - 1][player.x - 2];      
            if (obstacle == 'P'){
                console.log("CHECK: " + obstacles[obstacle]+ " is occuping this place")
                $("#check").get(0).load();
                $("#check").get(0).play();
                $("#t" + (player.y) + (player.x - 1)).addClass('puff-in-hor');
                checkPenalty+=1;
            break;
        }
            var obstacle2 = level[levelCounter][player.y - 1][player.x];
            if (obstacle2 == 'P'){
                console.log("CHECK: " + obstacles[obstacle2]+ " is occuping this place")
                $("#check").get(0).load();
                $("#check").get(0).play();
                $("#t" + (player.y) + (player.x - 1)).addClass('puff-in-hor');
                checkPenalty+=1;
            break;
        }
    }
            var piece = level[levelCounter][player.y][player.x - 1];
            if (piece == 'P'){
                console.log("PIECE CAPTURED: " + pieces[piece]);
                piecesCaptured+=1;
                $("#pawnGrab").get(0).load();
                $("#pawnGrab").get(0).play();
                level[levelCounter][player.y].splice(player.x-1, 1, " ");
            }
            
            player.x -=1;
            refreshBoard()
            console.log("X: " + player.x + "  Y: " + player.y)
            break;

            // UP UP UP UP

        case 'up':
        
            if (player.y < 1) {
                console.log("out of bounds");
                break;
            }
            if (player.y > 1){
                var obstacle = level[levelCounter][player.y - 2][player.x + 1];
                if (obstacle === 'P'){
                    console.log("CHECK: " + obstacles[obstacle]+ " is occuping this place");
                    $("#check").get(0).load();
                    $("#check").get(0).play();
                    $("#t" + (player.y-1) + player.x).addClass('puff-in-hor');
                    checkPenalty+=1;
                     
                break;
            }

            var obstacle2 = level[levelCounter][player.y - 2][player.x - 1];
            if (obstacle2 == 'P'){
                console.log("CHECK: " + obstacles[obstacle2]+ " is occuping this place");
                $("#check").get(0).load();
                $("#check").get(0).play();
                $("#t" + (player.y-1) + player.x).addClass('puff-in-hor');
                checkPenalty+=1;
                break;
            }
        }
            var piece = level[levelCounter][player.y - 1][player.x];
            if (piece == 'P'){
                console.log("PIECE CAPTURED: " + pieces[piece]);
                piecesCaptured+=1;
                $("#pawnGrab").get(0).load();
                $("#pawnGrab").get(0).play();
                level[levelCounter][player.y - 1].splice(player.x, 1, " ");
            }
            
            player.y -=1;
            refreshBoard()
            console.log("X: " + player.x + "  Y: " + player.y)
            break;

            // RIGHT RIGHT RIGHT RIGHT 

        case 'right':
            if (player.x == X_MAX) {
                console.log("out of bounds");
                break;
            }
            if (player.y > 1){
            var obstacle = level[levelCounter][player.y - 1][player.x];
            if (obstacle == 'P'){
                console.log("CHECK: " + obstacles[obstacle]+ " is occuping this place");
                $("#check").get(0).load();
                $("#check").get(0).play();
                checkPenalty+=1;
                $("#t" + (player.y) + (player.x+1)).addClass('puff-in-hor');
            break;
        }
            var obstacle2 = level[levelCounter][player.y - 1][player.x + 2];
            if (obstacle2 == 'P'){
                console.log("CHECK: " + obstacles[obstacle2]+ " is occuping this place")
                $("#check").get(0).load();
                $("#check").get(0).play();
                checkPenalty+=1;
                $("#t" + (player.y) + (player.x+1)).addClass('puff-in-hor')
            break;
        }
    }
            var piece = level[levelCounter][player.y][player.x + 1];
            if (piece == 'P'){
                console.log("PIECE CAPTURED: " + pieces[piece]);
                piecesCaptured+=1;
                $("#pawnGrab").get(0).load();
                $("#pawnGrab").get(0).play();
                level[levelCounter][player.y].splice(player.x + 1, 1, " ")
            }
        player.x +=1;
        refreshBoard()
        console.log("X: " + player.x + "  Y: " + player.y)
        break;

        // DOWN DOWN DOWN DOWN 

        case 'down':
            if (player.y == Y_MAX) {
                console.log("out of bounds");
                break;
            }
            var obstacle = level[levelCounter][player.y][player.x - 1];
            if (obstacle == 'P'){
                console.log("CHECK: " + obstacles[obstacle]+ " is occuping this place")
                $("#check").get(0).load();
                $("#check").get(0).play();
                checkPenalty+=1;
                $("#t" + (player.y + 1) + player.x).addClass('puff-in-hor')
            break;
            }
            var obstacle2 = level[levelCounter][player.y][player.x + 1];
            if (obstacle2 == 'P'){
                console.log("CHECK: " + obstacles[obstacle2]+ " is occuping this place")
                $("#check").get(0).load();
                $("#check").get(0).play();
                checkPenalty+=1;
                $("#t" + (player.y + 1) + player.x).addClass('puff-in-hor')
            break;
            }
            var piece = level[levelCounter][player.y + 1][player.x];
            if (piece == 'P'){
                console.log("PIECE CAPTURED: " + pieces[piece]);
                piecesCaptured+=1;
                $("#pawnGrab").get(0).load();
                $("#pawnGrab").get(0).play();
                level[levelCounter][player.y + 1].splice(player.x, 1, " ")
                    
            }
        player.y +=1;
        refreshBoard()
        console.log("X: " + player.x + "  Y: " + player.y)
        break;

        // DIAGONAL RIGHT DIAGONAL RIGHT 

        case 'diagr':
            if (player.x == X_MAX) {
                console.log("out of bounds");
                break;
            }
            if (player.y < 1) {
                console.log("out of bounds");
                break;
            }
            if (player.y > 1){
            var obstacle = level[levelCounter][player.y - 2][player.x + 2];
            if (obstacle == 'P'){
                console.log("CHECK: " + obstacles[obstacle]+ " is occuping this place")
                $("#check").get(0).load();
                $("#check").get(0).play();
                $("#t" + (player.y - 1) + (player.x + 1)).addClass('puff-in-hor')
                checkPenalty+=1;
            break;
        }
            var obstacle2 = level[levelCounter][player.y - 2][player.x];
            if (obstacle2 == 'P'){
                console.log("CHECK: " + obstacles[obstacle2]+ " is occuping this place")
                $("#check").get(0).load();
                $("#check").get(0).play();
                $("#t" + (player.y - 1) + (player.x + 1)).addClass('puff-in-hor')
                checkPenalty+=1;
            break;
        }
    }
        player.y -=1;
        player.x +=1;
        refreshBoard()
        console.log("X: " + player.x + "  Y: " + player.y)
        break;

        // DIAGONAL LEFT DIAGONAL LEFT 

        case 'diagl':
            if (player.x < 1) {
                console.log("out of bounds");
                break;
            }
            if (player.y < 1) {
                console.log("out of bounds");
                break;
            }
            if (player.y > 1){
            var obstacle = level[levelCounter][player.y - 2][player.x - 2];
            if (obstacle == 'P'){
                console.log("CHECK: " + obstacles[obstacle]+ " is occuping this place")
                $("#check").get(0).load();
                $("#check").get(0).play();
                $("#t" + (player.y - 1) + (player.x - 1)).addClass('puff-in-hor');
                checkPenalty+=1;
            break;
        }
            var obstacle2 = level[levelCounter][player.y - 2][player.x];
            if (obstacle2 == 'P'){
                console.log("CHECK: " + obstacles[obstacle2]+ " is occuping this place")
                $("#check").get(0).load();
                $("#check").get(0).play();
                $("#t" + (player.y - 1) + (player.x - 1)).addClass('puff-in-hor');
                checkPenalty+=1;
            break;
        }
    }
        player.y -=1;
        player.x -=1;
        refreshBoard()
        console.log("X: " + player.x + "  Y: " + player.y)
        break;
        
        // DIAGONAL DOWN LEFT

        case 'diagdl':
            if (player.x < 1) {
                console.log("out of bounds");
                break;
            }
            if (player.y == Y_MAX) {
                console.log("out of bounds");
                break;
            }
            if (player.y > 0){
            
            var obstacle2 = level[levelCounter][player.y][player.x -2];
            if (obstacle2 == 'P'){
                console.log("CHECK: " + obstacles[obstacle2]+ " is occuping this place")
                $("#check").get(0).load();
                $("#check").get(0).play();
                $("#t" + (player.y + 1) + (player.x - 1)).addClass('puff-in-hor');
                checkPenalty+=1;
            break;
        }
        var piece = level[levelCounter][player.y + 1][player.x - 1];
            if (piece == 'P'){
                console.log("PIECE CAPTURED: " + pieces[piece]);
                piecesCaptured+=1;
                $("#pawnGrab").get(0).load();
                $("#pawnGrab").get(0).play();
                level[levelCounter][player.y + 1].splice(player.x - 1, 1, " ")
            }
        
    }
        player.y +=1;
        player.x -=1;
        refreshBoard()
        console.log("X: " + player.x + "  Y: " + player.y)
        break;

        case 'diagdr':
            if (player.x == X_MAX) {
                console.log("out of bounds");
                break;
            }
            if (player.y == Y_MAX) {
                console.log("out of bounds");
                break;
            }
            if (player.y > 0){
            
            var obstacle2 = level[levelCounter][player.y][player.x + 2];
            if (obstacle2 == 'P'){
                console.log("CHECK: " + obstacles[obstacle2]+ " is occuping this place")
                $("#check").get(0).load();
                $("#check").get(0).play();
                $("#t" + (player.y + 1) + (player.x + 1)).addClass('puff-in-hor');
                checkPenalty+=1;
            break;
        }
        var piece = level[levelCounter][player.y + 1][player.x + 1];
            if (piece == 'P'){
                console.log("PIECE CAPTURED: " + pieces[piece]);
                piecesCaptured+=1;
                $("#pawnGrab").get(0).load();
                $("#pawnGrab").get(0).play();
                level[levelCounter][player.y + 1].splice(player.x + 1, 1, " ")
            }
    }
        player.y +=1;
        player.x +=1;
        refreshBoard()
        console.log("X: " + player.x + "  Y: " + player.y)
        break;
        
        
        }

        
        
    
}

function initialPosition(){
    player.x = 4;
    player.y = 7;
}


// CHEAT CODES TO CHANGE PLAYER PIECE
    $(document).ready(function() {
        $(document).cheatCodeVi();
        $(document).cheatCodeMa();
        $(document).cheatCodeLu();
        $(document).cheatCodeMi();
        $(document).cheatCodeLa();
        $(document).cheatCodeSi();
        $(document).cheatCodeNo();
        $(document).cheatCodeMr();
        $(document).cheatCodeVe();
        $(document).cheatCodeDa();
        $(document).cheatCodeFi();
    });

// HINT TEXT 
function bubbleText(){
    switch(levelCounter) {
        case 0:
        $('#pawnTut').hide();
        $('#score').hide();
        $('#scoreText').hide();
        $("#bubble").text("This is a typical chess board. Although, in this game, your goal is to navigate through the map in order to get to the next level. Try using E-S-F-D to move");
            break;
        case 1:
        $("#bubble").text("The pawns occupy one tile on each of their forward-diagonal. Try capture them or navigate around them in order to get to goal. oh, and don't worry, they won't move.....for now..");
        $('#pawnTut').show().fadeIn()
            break;
        case 2:
        $('#pawnTut').hide();
        $("#bubble").text("sometimes pawns are protected by other pawns. Try capturing the ones behind in order to capture the one in front.");
            break;
        case 3:
            $("#bubble").text("Try using the diagonal keys W and R to navigate through this chain of pawns");
            break;
        case 4:
            $("#bubble").text("Try using as few moves as possible to get a higher score");
            break;
        case 5:
            $("#bubble").text("Did you know... it took > 500 lines of codes to create 8 cheat codes?");
            break;
        case 6:
            $("#bubble").text("Getting yourself into checks will penalize your score");
            break;
        case 7:
            $("#bubble").text("Just two more levels and you've won!");
            break;
        case 8:
            $("#bubble").text("Barely done!");
            break;
        case 9:
            $("#bubble").text("Good luck..");
            // FAKE PAWNS WILL DISAPPEAR WHEN MOVING
            $("#t00").append('<div id=t00"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t01").append('<div id=t01"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t02").append('<div id=t02"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t03").append('<div id=t03"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            // GOAL IS HERE //
            $("#t05").append('<div id=t05"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t06").append('<div id=t06"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t07").append('<div id=t07"><img src="./pics/wp.png" alt="" height="60px" ></div>');

            $("#t10").append('<div id=t10"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t11").append('<div id=t11"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t12").append('<div id=t12"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t13").append('<div id=t13"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t14").append('<div id=t14"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t15").append('<div id=t15"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t16").append('<div id=t16"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t17").append('<div id=t17"><img src="./pics/wp.png" alt="" height="60px" ></div>');

            $("#t20").append('<div id=t20"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t21").append('<div id=t21"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t22").append('<div id=t22"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t23").append('<div id=t23"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t24").append('<div id=t24"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t25").append('<div id=t25"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t26").append('<div id=t26"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t27").append('<div id=t27"><img src="./pics/wp.png" alt="" height="60px" ></div>');

            $("#t30").append('<div id=t30"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t31").append('<div id=t31"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t32").append('<div id=t32"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t33").append('<div id=t33"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t34").append('<div id=t34"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t35").append('<div id=t35"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t36").append('<div id=t36"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t37").append('<div id=t37"><img src="./pics/wp.png" alt="" height="60px" ></div>');

            $("#t40").append('<div id=t40"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t41").append('<div id=t41"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t42").append('<div id=t42"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t43").append('<div id=t43"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t44").append('<div id=t44"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t45").append('<div id=t45"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t46").append('<div id=t46"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t47").append('<div id=t47"><img src="./pics/wp.png" alt="" height="60px" ></div>');

            $("#t50").append('<div id=t50"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t51").append('<div id=t51"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t52").append('<div id=t52"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t53").append('<div id=t53"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t54").append('<div id=t54"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t55").append('<div id=t55"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t56").append('<div id=t56"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t57").append('<div id=t57"><img src="./pics/wp.png" alt="" height="60px" ></div>');

            $("#t60").append('<div id=t60"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t61").append('<div id=t61"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t62").append('<div id=t62"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t63").append('<div id=t63"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t64").append('<div id=t64"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t65").append('<div id=t65"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t66").append('<div id=t66"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            $("#t67").append('<div id=t67"><img src="./pics/wp.png" alt="" height="60px" ></div>');
            break;
        case 10:
            $("#bubble").text("CONGRATZ! YOU MADE IT! YOUR FINAL SCORE IS:");
            var score = getScore();
            var scoreT = "Your score is: "
            $("#score").text( score ).fadeIn();
            $("#scoreText").text( scoreT ).fadeIn();
            
            break;
        
        
        default:
            console.log("What happend..?!")
    }
}
    


