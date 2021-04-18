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