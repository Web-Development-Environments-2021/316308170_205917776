const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
var canvas_width = 1000;
var canvas_height = 560;
var scale = window.devicePixelRatio
canvas.width = canvas_width * scale;
canvas.height = canvas_height * scale;
context.scale(scale, scale);


var break_animation = false;
var goUp = 'ArrowUp';
var goDown = 'ArrowDown';
var goLeft = 'ArrowLeft';
var goRight = 'ArrowRight';
var velocity = 2;
var mouth_open_counter = 0;


function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    console.log('animate');
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
pacman.X = (canvas.width / 8 + 30);
pacman.Y = 30;
animate();