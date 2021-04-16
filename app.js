var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;


// Config keys for settings:
var key_up = "ArrowUp";
var key_down = "ArrowDown";
var key_left = "ArrowLeft";
var key_right = "ArrowRight";
var key_is_pressed = false
var key_buttons = document.getElementsByName('key_button');

function disableOtherButtons(activeButton) {
    for (let i = 0; i < key_buttons.length; i++) {
        if (key_buttons[i]["id"] == activeButton) {
            continue;
        }
        document.getElementById(key_buttons[i]["id"]).disabled = true;

    }
}

function enableOtherButtons(activeButton) {
    for (let i = 0; i < key_buttons.length; i++) {
        key_buttons[i].disabled = false;

    }
}

function updateKeyControls(key_to_change) {
    //set pacman controls:
    disableOtherButtons(key_to_change);
    let chosen_key_code;
    $(document).keydown(function(event) {
        chosen_key_code = event.key;
        switch (key_to_change) {
            case "MoveUp_input":
                // check vailidity
                key_up = chosen_key_code
                document.getElementById("MoveUp_input").value = key_up;
                enableOtherButtons(key_to_change);
                break
            case "MoveDown_input":
                // check vailidity
                key_down = chosen_key_code
                document.getElementById("MoveDown_input").value = key_down;
                enableOtherButtons(key_to_change);
                break
            case "MoveRight_input":
                // check vailidity
                key_right = chosen_key_code
                document.getElementById("MoveRight_input").value = key_right;
                enableOtherButtons(key_to_change);
                break
            case "MoveLeft_input":
                // check vailidity
                key_left = chosen_key_code
                document.getElementById("MoveLeft_input").value = key_left;
                enableOtherButtons(key_to_change);
                break
        }
        $(document).unbind();
    });

}

// update value when scrolling slider
function updateTextInput(val, slider) {
    document.getElementById(slider).value = val;
}

// generate random int within range
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// function for setting's random button
function generateRandomSettings() {
    let balls = getRandomInt(50, 91);
    let monsters = getRandomInt(1, 5);
    let time = getRandomInt(60, 181);
    document.getElementById('slider_value_balls').value = balls;
    document.getElementById('slider_value_monsters').value = monsters;
    document.getElementById('slider_value_time').value = time;
    document.getElementById('slider_bar_balls').value = balls;
    document.getElementById('slider_bar_monsters').value = monsters;
    document.getElementById('slider_bar_time').value = time;
}


function changeBallColor(color, ball_id) {
    document.getElementById(ball_id).style.backgroundColor = color;
}

// --------------------------------------------------------------------------------------------------
$(document).ready(function() {
    context = canvas.getContext("2d");
    Start();
});

function Start() {
    board = new Array();
    score = 0;
    pac_color = "yellow";
    var cnt = 100;
    var food_remain = 50;
    var pacman_remain = 1;
    start_time = new Date();
    for (var i = 0; i < 10; i++) {
        board[i] = new Array();
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
        for (var j = 0; j < 10; j++) {
            if (
                (i == 3 && j == 3) ||
                (i == 3 && j == 4) ||
                (i == 3 && j == 5) ||
                (i == 6 && j == 1) ||
                (i == 6 && j == 2)
            ) {
                board[i][j] = 4;
            } else {
                var randomNum = Math.random();
                if (randomNum <= (1.0 * food_remain) / cnt) {
                    food_remain--;
                    board[i][j] = 1;
                } else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
                    shape.i = i;
                    shape.j = j;
                    pacman_remain--;
                    board[i][j] = 2;
                } else {
                    board[i][j] = 0;
                }
                cnt--;
            }
        }
    }
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
    var i = Math.floor(Math.random() * 9 + 1);
    var j = Math.floor(Math.random() * 9 + 1);
    while (board[i][j] != 0) {
        i = Math.floor(Math.random() * 9 + 1);
        j = Math.floor(Math.random() * 9 + 1);
    }
    return [i, j];
}

function GetKeyPressed() {
    if (keysDown[38]) {
        return 1;
    }
    if (keysDown[40]) {
        return 2;
    }
    if (keysDown[37]) {
        return 3;
    }
    if (keysDown[39]) {
        return 4;
    }
}

function Draw() {
    canvas.width = canvas.width; //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var center = new Object();
            center.x = i * 60 + 30;
            center.y = j * 60 + 30;
            if (board[i][j] == 2) {
                context.beginPath();
                context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] == 1) {
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] == 4) {
                context.beginPath();
                context.rect(center.x - 30, center.y - 30, 60, 60);
                context.fillStyle = "grey"; //color
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
        if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
            shape.j++;
        }
    }
    if (x == 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
            shape.i--;
        }
    }
    if (x == 4) {
        if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
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

function menu(nav) {
    hide();
    $('.' + nav).show();
};

function hide() {
    $('.welcome').hide();
    $('.register').hide();
    $('.login').hide();
    $('.pacman').hide();
    $('.settings').hide();
    $('.about').hide();
    // resetGame();
};