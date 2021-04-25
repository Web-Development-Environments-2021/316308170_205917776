// Config keys for settings:
var key_up = "ArrowUp";
var key_down = "ArrowDown";
var key_left = "ArrowLeft";
var key_right = "ArrowRight";
var key_is_pressed = false
var key_buttons = document.getElementsByName('key_button');
var users_DB = new Map([["k",["k","k k","k@k.com","1/1/95"]]]) // user & passwords dictionary {user : [password,fullname,email,birthday]}
const k_mail = ["k@k.com"];
var mails_DB = new Set(k_mail);
var online_user = "";

// for gal wanted to add set for mail's and check all the other things 
// need to remove login skip after finish the game ( onclick(main(..))

$(document).ready(function () {

	// register validation
	$("#register_form").validate({
		rules: {
			username: {
				required: true,
				validUsername: true,
                maxlength : 20
			},
			password: {
				required: true,
                minlength : 6,
                maxlength : 20,
				strongPassword: true
			},
			full_name: {
				required: true,
				letterswithspace: true,
                maxlength : 50
			},
			email: {
				required: true,
				email: true,
                isEmail : true,
                emailTaken : true,
                maxlength : 50
			},
			birthdate: {
				required: true
			}
		},
		messages: {
			username: {
				required: "Please enter valid username",
				validUsername: "Username already taken",
                maxlength : "Username max length is 20"
			},
			password: {
				required: "Please enter an password",
				strongPassword: "Password MUST contain at least one character and one number",
                minlength : "Password too short, minimum 6 characters",
                maxlength :"Password too long, maximum 20 characters",
			},
			full_name: {
				required: "Please enter a name",
				letterswithspace: "Full name can be only letters",
                maxlength :"Fullname too long, maximum 50 characters"
			},
			email: {
				required: "Please enter an email address",
                email : "Please enter an email address",
				isEmail: "Please enter an email address",
                emailTaken : "Email already taken",
                maxlength : "Email too long, maximum 50 characters"
			},
			birthdate: {
				required: "Please enter a birthday"
			}
		},
		submitHandler: function () {
            alert("registered successfully :D !")
            let t_username = document.getElementById("r_username").value;
	        let t_password = document.getElementById("r_password").value;
            let t_fullname = document.getElementById("r_full_name").value;
	        let t_email = document.getElementById("r_email").value;
            let t_birthdate = document.getElementById("r_birthdate").value;
            users_DB.set(t_username,[t_password,t_fullname,t_email,t_birthdate]);
            mails_DB.add(t_email)
            menu('login')      
			cleatText('register');
		},
	});

	//login validation
    $('#b_login').click( function() {     
        $("#login_form").validate({
            rules: {
                username: {
                    required: true,
                },
                password: {
                    required: true,
                }
            },
            messages: {
                username: {
                    required: "Please enter username"
                },
                password: {
                    required: "Please enter an password"
                }
            },
            submitHandler: function () {
                let username_input = document.getElementById("l_username").value;
                let password_input = document.getElementById("l_password").value;
                let user_password = users_DB.get(username_input); // password of the user
                if(user_password != null && user_password[0] === password_input) { 
                    online_user = username_input;
                    menu('settings');
                    cleatText('login');
                }
                else{
                    alert("Username or password is not valid")
                    cleatText('login');
                }
            },
            // invalidHandler : function(event,validator){
                
            // },
        });
    });
});
$(function() {

	// register check
	$.validator.addMethod('strongPassword', function (pass) {
		return /\d/.test(pass) && /[a-z]/i.test(pass);
	});

	$.validator.addMethod('validUsername', function (newUser) {
		return !(users_DB.has(newUser));
	});

    $.validator.addMethod('isEmail',function (mail){
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(mail);
    });

    $.validator.addMethod('emailTaken',function (mail){
        return !(mails_DB.has(mail))
    });

    $.validator.addMethod('letterswithspace',function (fullname){  
        var RegExpression = /^[a-zA-Z\s]*$/;  
        return RegExpression.test(fullname)
    });

});

function cleatText(form){
    $("#"+form +'_form').trigger("reset")
}

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
    document.getElementById('color1').value = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
    changeBallColor(document.getElementById('color1').value, 'colorBtn1')
    document.getElementById('color2').value = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
    changeBallColor(document.getElementById('color2').value, 'colorBtn2')
    document.getElementById('color3').value = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
    changeBallColor(document.getElementById('color3').value, 'colorBtn3')
}


function changeBallColor(color, ball_id) {
    document.getElementById(ball_id).style.backgroundColor = color;
    if (ball_id == 'colorBtn1_game') color_of_5_balls = color;
    else if (ball_id == 'colorBtn2_game') color_of_15_balls = color;
    else if (ball_id == 'colorBtn3_game') color_of_25_balls = color;
    if (isLightColor(color)) document.getElementById(ball_id).style.color = '#000000';
    else document.getElementById(ball_id).style.color = '#FFFFFF';
}


function menu(nav) {
    hide();
    $('.' + nav).show();
    if (nav == 'pacman') {
        $('#canvas').show();
        $('#score').show();
        $('#timer').show();
        animate();
    } else {
        resetGame();
    }
};

function hide() {
    $('.welcome').hide();
    $('.register').hide();
    $('.login').hide();
    $('.pacman').hide();
    $('.settings').hide();
    //$('.about').hide();
    $('#canvas').hide();
    // resetGame();
};


function isLightColor(color) {

    // Variables for red, green, blue values
    var r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        r = color[1];
        g = color[2];
        b = color[3];
    } else {

        // If hex --> Convert it to RGB: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(
            color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {

        return true;
    } else {

        return false;
    }
}

var color_of_5_balls = document.getElementById('color1').value;
var color_of_15_balls = document.getElementById('color2').value;
var color_of_25_balls = document.getElementById('color3').value;
document.getElementById('colorBtn1').style.background = color_of_5_balls;
document.getElementById('colorBtn2').style.background = color_of_15_balls;
document.getElementById('colorBtn3').style.background = color_of_25_balls;
if (isLightColor(color_of_5_balls)) document.getElementById('colorBtn1').style.color = '#000000';
else document.getElementById('colorBtn1').style.color = '#FFFFFF';
if (isLightColor(color_of_15_balls)) document.getElementById('colorBtn2').style.color = '#000000';
else document.getElementById('colorBtn2').style.color = '#FFFFFF';
if (isLightColor(color_of_25_balls)) document.getElementById('colorBtn3').style.color = '#000000';
else document.getElementById('colorBtn3').style.color = '#FFFFFF';
document.getElementById('colorBtn1_game').style.background = color_of_5_balls;
document.getElementById('colorBtn2_game').style.background = color_of_15_balls;
document.getElementById('colorBtn3_game').style.background = color_of_25_balls;
if (isLightColor(color_of_5_balls)) document.getElementById('colorBtn1_game').style.color = '#000000';
else document.getElementById('colorBtn1').style.color = '#FFFFFF';
if (isLightColor(color_of_15_balls)) document.getElementById('colorBtn2_game').style.color = '#000000';
else document.getElementById('colorBtn2').style.color = '#FFFFFF';
if (isLightColor(color_of_25_balls)) document.getElementById('colorBtn3_game').style.color = '#000000';
else document.getElementById('colorBtn3').style.color = '#FFFFFF';

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("#about");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
function btn_about() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
window.addEventListener('keydown' , function(event) {
    if (event.key == 'Escape') {
        modal.style.display = "none";
    }
  })