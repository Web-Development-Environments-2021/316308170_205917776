var context;
var shape = new Object(); //pacman object
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var board_Y = 20;
var board_X = 20;


// --------------------------------------------------------------------------------------------------
$(document).ready(function() {
    context = canvas.getContext("2d");
});



function isWall(i, j) {
    return (i == 9 && j == 0) ||
        (i == 9 && j == 1) ||
        (i == 9 && j == 2) ||
        (i == 9 && j == 3) ||
        (i == 9 && j == 4) ||
        (i == 11 && j == 0) ||
        (i == 11 && j == 1) ||
        (i == 11 && j == 2) ||
        (i == 11 && j == 3) ||
        (i == 11 && j == 4) ||
        (i == 11 && j == 18) ||
        (i == 11 && j == 17) ||
        (i == 11 && j == 16) ||
        (i == 11 && j == 15) ||
        (i == 8 && j == 4) ||
        (i == 7 && j == 4) ||
        (i == 6 && j == 4) ||
        (i == 6 && j == 3) ||
        (i == 11 && j == 0) ||
        (i == 11 && j == 1) ||
        (i == 11 && j == 2) ||
        (i == 11 && j == 3) ||
        (i == 11 && j == 4) ||
        (i == 10 && j == 18) ||
        (i == 9 && j == 18) ||
        (i == 8 && j == 18) ||
        (i == 7 && j == 18)
}

function Start() {
    board = new Array();
    score = 0;
    pac_color = "yellow";
    var cnt = board_X * board_Y;
    var food_remain = document.getElementById('slider_value_balls').value;
    console.log(food_remain);
    var pacman_remain = 1;
    start_time = new Date();
    for (var i = 0; i < board_Y; i++) {
        board[i] = new Array();
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
        for (var j = 0; j < board_X; j++) {
            if (isWall(i, j)) {
                board[i][j] = 4; //4 == Wall
            } else {
                var randomNum = Math.random();
                if (randomNum <= (1.0 * food_remain) / cnt) {
                    food_remain--;
                    board[i][j] = 1; // 1 == food
                } else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
                    shape.i = i;
                    shape.j = j;
                    pacman_remain--;
                    board[i][j] = 2; // 2 == pacman
                } else {
                    board[i][j] = 0; // 0 == empty cell
                }
                cnt--;
            }
        }
    }
    // spread food randomly
    while (food_remain > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 1;
        food_remain--;
    }
    keysDown = {};
    addEventListener(
        "keydown",
        function(e) {
            keysDown[e.keyCode] = true;
        },
        false
    );
    addEventListener(
        "keyup",
        function(e) {
            keysDown[e.keyCode] = false;
        },
        false
    );
    interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
    var i = Math.floor(Math.random() * (board_Y - 1) + 1);
    var j = Math.floor(Math.random() * (board_X - 1) + 1);
    while (board[i][j] != 0) {
        i = Math.floor(Math.random() * (board_Y - 1) + 1);
        j = Math.floor(Math.random() * (board_X - 1) + 1);
    }
    return [i, j];
}

function GetKeyPressed() {
    if (keysDown[38]) { // Arrow Up
        return 1;
    }
    if (keysDown[40]) { // Arrow Down
        return 2;
    }
    if (keysDown[37]) { // Arrow Left
        return 3;
    }
    if (keysDown[39]) { // Arrow Right
        return 4;
    }
}

function Draw() {
    canvas.width = canvas.width; //clean board
    // lblScore.value = score;
    // lblTime.value = time_elapsed;
    for (var i = 0; i < board_Y; i++) {
        for (var j = 0; j < board_X; j++) {
            var center = new Object();
            center.x = i * canvas.width / (board_X) + 10;
            center.y = j * canvas.height / (board_Y) + 10;
            // If cell contains pacman
            if (board[i][j] == 2) {
                context.beginPath();
                context.arc(center.x, center.y, 10, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 5 / 3, center.y - 5, 5 / 3, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
                // If cell contains food
            } else if (board[i][j] == 1) {
                context.beginPath();
                context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = "white"; //color
                context.fill();
                // If cell contains wall
            } else if (board[i][j] == 4) {
                context.beginPath();
                context.rect(center.x - canvas.width / (6 * board_X), center.y - canvas.width / (6 * board_Y), canvas.width / (3 * board_X), canvas.width / (3 * board_Y));
                context.fillStyle = "yellow"; //color
                context.fill();
            }
        }
    }
}

function UpdatePosition() {
    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
    if (x == 1) {
        if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
            shape.j--;
        }
    }
    if (x == 2) {
        if (shape.j < board_X - 1 && board[shape.i][shape.j + 1] != 4) {
            shape.j++;
        }
    }
    if (x == 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
            shape.i--;
        }
    }
    if (x == 4) {
        if (shape.i < board_Y - 1 && board[shape.i + 1][shape.j] != 4) {
            shape.i++;
        }
    }
    if (board[shape.i][shape.j] == 1) {
        score++;
    }
    board[shape.i][shape.j] = 2;
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    if (score >= 20 && time_elapsed <= 10) {
        pac_color = "green";
    }
    if (score == 50) {
        window.clearInterval(interval);
        window.alert("Game completed");
    } else {
        Draw();
    }
}
