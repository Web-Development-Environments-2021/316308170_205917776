const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
var canvas_width = 1000;
var canvas_height = 620;
var scale = window.devicePixelRatio
canvas.width = canvas_width * scale;
canvas.height = canvas_height * scale;
context.scale(scale, scale);

console.clear();

var break_animation = false;
var goUp = 'ArrowUp';
var goDown = 'ArrowDown';
var goLeft = 'ArrowLeft';
var goRight = 'ArrowRight';
var velocity = 1;
var mouth_open_counter = 0;

var board = new Board([canvas.width / 8,0]);
var pacman = new Pacman(canvas.width / 8+ 30,30,0,0);
pacman.locationOngrid = board.getLocation([pacman.X,pacman.Y]);

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    board.draw();
    pacman.update();
    pacman.draw(mouth_open_counter);
    ++mouth_open_counter;
    if (mouth_open_counter > 10) mouth_open_counter = 0;
    if (break_animation) return;
    requestAnimationFrame(animate);
}

window.addEventListener('keydown', function(e) {
        if (e.code === 'Space') break_animation = true;
        else if (e.code === goUp) pacman.setVelocity(0, -velocity);
        else if (e.code === goDown) pacman.setVelocity(0, velocity);
        else if (e.code === goLeft) pacman.setVelocity(-velocity, 0);
        else if (e.code === goRight) pacman.setVelocity(velocity, 0);
    })
    // board.generateBoard();

animate();