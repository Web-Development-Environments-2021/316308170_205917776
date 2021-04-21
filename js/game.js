const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
var wall_size = 18;
var canvas_width = 1000;
var canvas_height = wall_size * 31;
var scale = window.devicePixelRatio
canvas.width = canvas_width * scale;
canvas.height = canvas_height * scale;
context.scale(scale, scale);
var ghost_img = document.createElement("img");
ghost_img.src = "./images/ghosts.png"


// ghost sprite size (160,160) space (30), space to other ghost (50,30)


var break_animation = false;
var goUp = 'ArrowUp';
var goDown = 'ArrowDown';
var goLeft = 'ArrowLeft';
var goRight = 'ArrowRight';
var velocity = 1.5; // 1 or 2 
var ghost_velocity = velocity - 0.5
var mouth_open_counter = 0;
var num_of_seconds;
var timer_count = 0;
var strikes = 5;
var got_pacman = false;
var board = new Board([canvas.width / 6, 0], wall_size);
var pacman_start = board.getPixel([12, 15])
var pacman = new Pacman(pacman_start[0] + (wall_size / 2), pacman_start[1] + (wall_size / 2), 0, 0, wall_size / 2);
var blinky = new Ghost(canvas.width / 6 + wall_size, wall_size, ghost_velocity, 0, 0, 0, wall_size, ghost_velocity);
pacman.locationOngrid = board.getLocation([pacman.X, pacman.Y]);
blinky.locationOngrid = board.getLocation([blinky.X, blinky.Y]);

function setGameValues() {
    var num_of_balls = document.getElementById('slider_value_balls').value;
    var num_of_ghosts = document.getElementById('slider_value_monsters').value;
    num_of_seconds = document.getElementById('slider_value_time').value;
    var num_of_sour_sweet_candies = 2;
    var num_of_5_balls = Math.floor(0.6 * num_of_balls);
    var num_of_15_balls = Math.floor(0.3 * num_of_balls);
    var num_of_25_balls = Math.floor(0.1 * num_of_balls);
    color_of_5_balls = document.getElementById('color1').value;
    color_of_15_balls = document.getElementById('color2').value;
    color_of_25_balls = document.getElementById('color3').value;
    document.getElementById('colorBtn1_game').style.background = color_of_5_balls;
    document.getElementById('colorBtn2_game').style.background = color_of_15_balls;
    document.getElementById('colorBtn3_game').style.background = color_of_25_balls;
    document.getElementById('timer_count').innerHTML = num_of_seconds;
    if (isLightColor(color_of_5_balls)) document.getElementById('colorBtn1').style.color = '#000000';
    else document.getElementById('colorBtn1').style.color = '#FFFFFF';
    board.generateRandomBalls(num_of_balls, num_of_5_balls, num_of_15_balls, num_of_25_balls, num_of_sour_sweet_candies);


}

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    board.draw();
    pacman.update();
    pacman.draw();
    blinky.update();
    blinky.draw();
    if (timer_count > 60) {
        num_of_seconds--;
        document.getElementById('timer_count').innerHTML = num_of_seconds;
        timer_count = 0;
    }
    timer_count++;
    if (break_animation) return;
    requestAnimationFrame(animate);
}

function resetGame() {
    break_animation = true;
    break_animation = false;


}

window.addEventListener('keydown', function(e) {
        if (e.code === 'Space') break_animation = true;
        else if (e.code === goUp) pacman.setVelocity(0, -velocity);
        else if (e.code === goDown) pacman.setVelocity(0, velocity);
        else if (e.code === goLeft) pacman.setVelocity(-velocity, 0);
        else if (e.code === goRight) pacman.setVelocity(velocity, 0);
    })
    // board.generateBoard();


const reloadtButton = document.querySelector("#reload");
// Reload everything:
function reload() {
    reload = location.reload();
}
// Event listeners for reload
reloadButton.addEventListener("click", reload, false);