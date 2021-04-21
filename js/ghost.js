class Ghost extends MoveObject {
    constructor(X, Y, vx, vy, sx, sy, size, velocity) {
        super(X, Y, vx, vy, 0);
        this.diff_level = 1;
        this.timer = 0;
        this.velocity = velocity
        this.current_pacman_path = []
        this.img_locations = {
            "up": [sx + 190, sy],
            "down": [sx, sy + 190],
            "left": [sx + 190, sy + 190],
            "right": [sx, sy]
        };
        this.direction = this.img_locations["right"];
        this.size = size;
        this.move_direction = {
            "up": [0, -this.velocity],
            "down": [0, this.velocity],
            "left": [-this.velocity, 0],
            "right": [this.velocity, 0]
        }
        this.current_val = 2;
        this.next_val = 0;
        this.prev_val = 0;
    }

    isValidCoordinate(x, y, current_path) {
        return x >= 0 && y >= 0 && x < board.length && y < board.length && board[x][y] == 0 && !([x, y] in current_path);
    }

    calc_manhatten_dist(pacman_location, i, j) {
        let coor_x = pacman_location[0];
        let coor_y = pacman_location[1];
        return Math.abs(this.locationOngrid[0] + i) - coor_x + Math.abs(this.locationOngrid[1] + j) - coor_y;
    }

    next_move() {
        let random_condition = Math.random() < (this.diff_level / (this.diff_level + 1))
        if ((!this.checkForTurnCollision(this.vx, this.vy) && random_condition) || this.collisionDetection()) {
            if (this.timer > 40) {
                this.diff_level++;
                this.timer = 0;
            }
            this.timer++;
            let distance = Number.MAX_SAFE_INTEGER;
            var best_direction = "";
            for (var key in this.move_direction) {
                if (!this.checkForTurnCollision(this.move_direction[key][0], this.move_direction[key][1])) {
                    let current_distance = Math.sqrt(Math.pow((pacman.X - Math.abs(this.X + this.move_direction[key][0])), 2) + Math.pow((pacman.Y - Math.abs(this.Y + this.move_direction[key][1])), 2));
                    if (current_distance < distance && Math.random() < 0.99) {
                        distance = current_distance;
                        best_direction = key;
                    }
                }
            }
            if (best_direction != "") {
                this.direction = this.img_locations[best_direction];
                this.vx = this.move_direction[best_direction][0];
                this.vy = this.move_direction[best_direction][1];
                this.changeDirection(this.vx, this.vy)
            }
        }
    }

    setVelocity(velocity) {
        this.move_direction = {
            "up": [0, -velocity],
            "down": [0, velocity],
            "left": [-velocity, 0],
            "right": [velocity, 0]
        }
    }

    update() {
        // let neighbor = this.find_path_to_pacman(pacman.locationOngrid)
        // get directions by order - best to worst
        this.next_move();
        let current_location = this.locationOngrid;
        this.X += this.vx;
        this.Y += this.vy;
        let next_location = board.getLocation([this.X, this.Y]);
        if (current_location != this.next_location) {
            if (grid[next_location[1]][next_location[0]] == 1) { //got pacman!
                // alert('got pacman!');
                this.vx = 0;
                this.vy = 0;
                if (!got_pacman) {
                    got_pacman = true;
                    document.getElementById('life' + strikes).style.display = "none";
                    strikes--;
                    this.velocity = 2;
                    setTimeout(function lose_life() {
                        pacman.X = pacman_start[0] + (wall_size / 2)
                        pacman.Y = pacman_start[1] + (wall_size / 2)
                        got_pacman = false;
                        this.vx = this.velocity;
                        this.vy = this.velocity;
                        console.log(this.velocity)
                    }, 2000)
                }
            }
            grid[current_location[1]][current_location[0]] = this.prev_val;
            this.prev_val = grid[next_location[1]][next_location[0]];
            if (!(grid[next_location[1]][next_location[0]] == 4 || //if is food, don't override it.
                    grid[next_location[1]][next_location[0]] == 5 ||
                    grid[next_location[1]][next_location[0]] == 6 ||
                    grid[next_location[1]][next_location[0]] == 9)) {
                grid[next_location[1]][next_location[0]] = 2;
            }

        }
        // let prev_value = grid[prev_location[1]][prev_location[0]]

        this.locationOngrid = board.getLocation([this.X, this.Y]); //return the last location accurate on grid [x,y]
        // grid[prev_location[1]][prev_location[0]] = prev_value;
    }



    changeDirection(vx, vy) {
        if (vx > 0) { //right
            this.direction = this.img_locations["right"];
        } else if (vx < 0) { //left
            this.direction = this.img_locations["left"];
        } else if (vy > 0) { //down
            this.direction = this.img_locations["down"];
        } else if (vy < 0) { //up
            this.direction = this.img_locations["up"];
        }
    }

    draw() {
        void context.drawImage(ghost_img, this.direction[0], this.direction[1], 160, 160, this.X, this.Y, this.size, this.size);
    }

}