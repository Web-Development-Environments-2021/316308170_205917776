const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
var wall_size = 18;
var canvas_width = wall_size * 28;
var canvas_height = wall_size * 31;
var scale = window.devicePixelRatio
canvas.width = canvas_width * scale;
canvas.height = canvas_height * scale;
context.scale(scale, scale);
var ghost_img = document.createElement("img");
ghost_img.src = "./images/ghosts.png"

var cherry_img = document.createElement("img");
cherry_img.src = "./images/cherry.png"

var music = new Audio("./music/game_soundtrack.mp3");
var dead_sfx = new Audio("./music/dead.mp3");

var requestAnimationFrame = window.requestAnimationFrame
var cancelAnimationFrame = window.cancelAnimationFrame
var myReq;

// ghost sprite size (160,160) space (30), space to other ghost (50,30)


var break_animation = false;
var goUp = 'ArrowUp';
var goDown = 'ArrowDown';
var goLeft = 'ArrowLeft';
var goRight = 'ArrowRight';
var velocity = 1.5; // 1 or 2 
var ghost_velocity = velocity - 0.5
var ghost_center = 20;
var mouth_open_counter = 0;
var num_of_seconds;
var timer_count = 0;
var strikes = 5;
var got_pacman = false;
var board = new Board([0, 0], wall_size);

function generateRandomPosition() {
    let i = 5 + Math.floor(Math.random() * (grid.length - 10))
    let j = 5 + Math.floor(Math.random() * (grid[0].length - 10))
    if (grid[j][i] != 0) return generateRandomPosition();
    else return [i, j]
}

var pacman_start = board.getPixel(generateRandomPosition())
var pacman = new Pacman(pacman_start[0] + (wall_size / 2), pacman_start[1] + (wall_size / 2), 0, 0, wall_size / 2);
pacman.locationOngrid = board.getLocation([pacman.X, pacman.Y]);

var red_ghost_start = board.getPixel([1, 1])
var red_ghost = new Ghost(red_ghost_start[0], red_ghost_start[1], ghost_velocity, 0, 0, 0, wall_size, "red");
red_ghost.locationOngrid = board.getLocation([red_ghost.X, red_ghost.Y]);

var pink_ghost_start = board.getPixel([1, 29])
var pink_ghost = new Ghost(pink_ghost_start[0], pink_ghost_start[1], ghost_velocity, 0, 0, 380, wall_size, "pink");
pink_ghost.locationOngrid = board.getLocation([pink_ghost.X, pink_ghost.Y]);

var orange_ghost_start = board.getPixel([26, 1])
var orange_ghost = new Ghost(orange_ghost_start[0], orange_ghost_start[1], ghost_velocity, 0, 400, 380, wall_size, "orange");
orange_ghost.locationOngrid = board.getLocation([orange_ghost.X, orange_ghost.Y]);

var blue_ghost_start = board.getPixel([26, 29])
var blue_ghost = new Ghost(blue_ghost_start[0], blue_ghost_start[1], ghost_velocity, 0, 400, 0, wall_size, "blue");
blue_ghost.locationOngrid = board.getLocation([blue_ghost.X, blue_ghost.Y]);

var extra_ghost1 = new Ghost(pink_ghost_start[0], pink_ghost_start[1], ghost_velocity, 0, 0, 0, wall_size, "ex1");
extra_ghost1.locationOngrid = board.getLocation([extra_ghost1.X, extra_ghost1.Y]);
var extra_ghost2 = new Ghost(orange_ghost_start[0], orange_ghost_start[1], ghost_velocity, 0, 400, 0, wall_size, "ex2");
extra_ghost2.locationOngrid = board.getLocation([extra_ghost2.X, extra_ghost2.Y]);
var ghosts = [red_ghost, pink_ghost, blue_ghost, orange_ghost] //should be random
var ex1_in_ghosts = false;


var cherry_start = board.getPixel([14, 17])
var cherry = new Cherry(cherry_start[0], cherry_start[1], velocity * 0.75, 0, 0, 0, wall_size);
cherry.locationOngrid = [14, 17];


function setGameValues() {
    m_play(music);
    goUp = document.getElementById('MoveUp_input').value;
    goDown = document.getElementById('MoveDown_input').value;
    goRight = document.getElementById('MoveRight_input').value;
    goLeft = document.getElementById('MoveLeft_input').value;
    document.getElementById('MoveUp_game').value = goUp;
    document.getElementById('MoveDown_game').value = goDown;
    document.getElementById('MoveRight_game').value = goRight;
    document.getElementById('MoveLeft_game').value = goLeft;
    document.getElementById('online_username_display').innerHTML = online_user
    document.getElementById('score_number').innerHTML = 0;
    var num_of_balls = document.getElementById('slider_value_balls').value;
    var num_of_ghosts = document.getElementById('slider_value_monsters').value;
    // remove random shots - depends on num_of_ghosts given.
    for (let i = 0; i < 4 - num_of_ghosts; i++) {
        random_index = Math.floor(Math.random() * (4 - i))
        ghosts.splice(random_index, 1)
    }
    num_of_seconds = document.getElementById('slider_value_time').value;
    var num_of_sour_sweet_candies = 2;
    var num_of_ghost_candy = 2;
    strikes = 5;
    var num_of_5_balls = Math.floor(0.6 * num_of_balls);
    var num_of_15_balls = Math.floor(0.3 * num_of_balls);
    var num_of_25_balls = Math.floor(0.1 * num_of_balls);
    board.numofballs = num_of_balls;
    color_of_5_balls = document.getElementById('color1').value;
    color_of_15_balls = document.getElementById('color2').value;
    color_of_25_balls = document.getElementById('color3').value;
    document.getElementById('color1_game').value = document.getElementById('color1').value;
    document.getElementById('color2_game').value = document.getElementById('color2').value;
    document.getElementById('color3_game').value = document.getElementById('color3').value;
    document.getElementById('colorBtn1_game').style.background = color_of_5_balls;
    document.getElementById('colorBtn2_game').style.background = color_of_15_balls;
    document.getElementById('colorBtn3_game').style.background = color_of_25_balls;
    document.getElementById('timer_count').innerHTML = num_of_seconds;
    document.getElementById('life1').style.display = "inline-flex";
    document.getElementById('life2').style.display = "inline-flex";
    document.getElementById('life3').style.display = "inline-flex";
    document.getElementById('life4').style.display = "inline-flex";
    document.getElementById('life5').style.display = "inline-flex";
    if (isLightColor(color_of_5_balls)) document.getElementById('colorBtn1').style.color = '#000000';
    else document.getElementById('colorBtn1').style.color = '#FFFFFF';
    board.generateRandomBalls(num_of_balls, num_of_5_balls, num_of_15_balls, num_of_25_balls, num_of_sour_sweet_candies, num_of_ghost_candy);
}

function checkIfCrash(ghost) {
    if (pacman.locationOngrid[0] == ghost.locationOngrid[0] && pacman.locationOngrid[1] == ghost.locationOngrid[1]) {
        music.pause();
        m_play(dead_sfx);
        document.getElementById('life' + strikes).style.display = "none";
        strikes--;
        document.getElementById('score_number').innerHTML = parseInt(document.getElementById('score_number').innerHTML) - 10;
        for (let i = 0; i < ghosts.length; i++) {
            let curr_ghost = ghosts[i]
            grid[curr_ghost.locationOngrid[1]][curr_ghost.locationOngrid[0]] = 0;
            curr_ghost.resetLocation();
        }
        if (extra_ghost1 in ghosts) {
            grid[extra_ghost1.locationOngrid[1]][extra_ghost1.locationOngrid[0]] = 0;
            extra_ghost1.resetLocation();
        }
        if (extra_ghost2 in ghosts) {
            grid[extra_ghost2.locationOngrid[1]][extra_ghost2.locationOngrid[0]] = 0;
            extra_ghost2.resetLocation();
        }
        grid[cherry.locationOngrid[1]][cherry.locationOngrid[0]] = 0;
        cherry.resetLocation();
        grid[pacman.locationOngrid[1]][pacman.locationOngrid[0]] = 0;
        pacman.resetLocation();
        if (strikes > 0) {
            alert("gotcha'!");
            m_play(music);
        } else {
            alert("Loser!");
            break_animation = true;
        }
    }
}

var gameover = false;

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    board.draw();
    pacman.update();
    pacman.draw();
    if (typeof cherry !== 'undefined' && !cherry.eaten) {
        cherry.update();
        cherry.draw();
    }
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].update();
        ghosts[i].draw();
        checkIfCrash(ghosts[i]);
    }
    if (timer_count > 60 || board.numofballs == 0) {
        num_of_seconds--;
        if (num_of_seconds == 0 || board.numofballs == 0) {
            if (!gameover) {
                gameover = true;
                setTimeout(function game_over() {
                    music.pause();
                    let score = parseInt(document.getElementById('score_number').innerHTML);
                    if (score < 100) alert(`You are better than ${score} points!`)
                    else alert('Winner!!!')
                    break_animation = true;
                }, 300)
            }
        }
        document.getElementById('timer_count').innerHTML = num_of_seconds;
        timer_count = 0;
    }
    timer_count++;
    if (break_animation) return;
    myReq = requestAnimationFrame(animate);
}


function reset_game() {
    // reset ghosts
    ghosts.splice(0, ghosts.length)
    ghosts = [red_ghost, pink_ghost, blue_ghost, orange_ghost]
    for (let i = 0; i < ghosts.length; i++) {
        let curr_ghost = ghosts[i]
        grid[curr_ghost.locationOngrid[1]][curr_ghost.locationOngrid[0]] = 0;
        curr_ghost.resetLocation();
    }
    // remove extra ghosts
    // for (let i = 0; i < ghosts.length; i++) {
    //     if (ghosts[i] == extra_ghost1 || ghosts[i] == extra_ghost2) {
    //         ghosts.splice(i, 1)
    //         console.log('here')
    //     }
    // }
    // reset cherry and pacman
    grid[cherry.locationOngrid[1]][cherry.locationOngrid[0]] = 0;
    cherry.resetLocation();
    cherry.eaten = false;
    grid[pacman.locationOngrid[1]][pacman.locationOngrid[0]] = 0;
    pacman.resetLocation();
    // reset board
    board.clearGrid();
    board.numofballs = -1;
    // stop animation and return to settings
    cancelAnimationFrame(myReq);
    music.pause();
    ex1_in_ghosts = false;
    gameover = false;
}


function resetGame() {
    break_animation = true;
    break_animation = false;
}

function m_play(sfx) {
    sfx.currentTime = 0;
    sfx.play();
}

function isplay(sfx) {
    if (!sfx.paused) {
        sfx.pause();
    } else {
        sfx.currentTime = 0;
        sfx.play();
    }
}


window.addEventListener('keydown', function(e) {
        if (e.code == 'Space') break_animation = true;
        if (e.key === goUp) pacman.setVelocity(0, -velocity);
        else if (e.key === goDown) pacman.setVelocity(0, velocity);
        else if (e.key === goLeft) pacman.setVelocity(-velocity, 0);
        else if (e.key === goRight) pacman.setVelocity(velocity, 0);
    })
    // board.generateBoard();


// const reloadtButton = document.querySelector("#reload");
// // Reload everything:
// function reload() {
//     reload = location.reload();
// }
// // Event listeners for reload
// reloadButton.addEventListener("click", reload, false);