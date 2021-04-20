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


function setGameValues() {
    var num_of_balls = document.getElementById('slider_value_balls').value;
    var num_of_ghosts = document.getElementById('slider_value_monsters').value;
    var num_of_minutes = document.getElementById('slider_value_time').value;
    board.generateRandomBalls(num_of_balls);
    console.log(grid)
    console.log(num_of_balls, num_of_ghosts, num_of_minutes);

}


// ghost sprite size (160,160) space (30), space to other ghost (50,30)

var break_animation = false;
var goUp = 'ArrowUp';
var goDown = 'ArrowDown';
var goLeft = 'ArrowLeft';
var goRight = 'ArrowRight';
var velocity = 2; // 1 or 2 
var mouth_open_counter = 0;
var board = new Board([canvas.width / 6, 0], wall_size);
var pacman_start = board.getPixel([13, 15])
var pacman = new Pacman(pacman_start[0] + (wall_size / 2), pacman_start[1] + (wall_size / 2), 0, 0, wall_size / 2);
var blinky = new Ghost(canvas.width / 6 + wall_size, wall_size, velocity - 0.5, 0, 0, 0, wall_size, velocity - 0.5);
pacman.locationOngrid = board.getLocation([pacman.X, pacman.Y]);
blinky.locationOngrid = board.getLocation([blinky.X, blinky.Y]);

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    board.draw();
    pacman.update();
    pacman.draw();
    blinky.update();
    blinky.draw();

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