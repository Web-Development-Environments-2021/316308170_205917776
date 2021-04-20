class Ghost extends MoveObject {
    constructor(X, Y, vx, vy, sx, sy, size, velocity) {
        super(X, Y, vx, vy, 0);
        this.diff_level = 1;
        this.timer = 0;
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
            "up": [0, -velocity],
            "down": [0, velocity],
            "left": [-velocity, 0],
            "right": [velocity, 0]
        }
    }

    isValidCoordinate(x, y, current_path) {
        return x >= 0 && y >= 0 && x < board.length && y < board.length && board[x][y] == 0 && !([x, y] in current_path);
    }

    find_path_to_pacman(pacman_location) {
        let queue = []
        queue.push([this.locationOngrid]);
        while (queue.length != 0) {
            let current_path = queue.shift(); //get current path
            // console.log(current_path)
            let coordinate = current_path[current_path.length - 1] // get last coordinate
                // console.log(coordinate)
            if (coordinate == [pacman_location[0], pacman_location[1]]) { //found pacman
                console.log("found path!")
                return current_path[1]; //neighbor to move to
            }
            let x_coor = coordinate[0];
            let y_coor = coordinate[1];
            if (this.isValidCoordinate(x_coor + 1, y_coor, current_path)) queue.push(current_path.concat([
                [x_coor + 1, y_coor]
            ]))
            if (this.isValidCoordinate(x_coor - 1, y_coor, current_path)) queue.push(current_path.concat([
                [x_coor - 1, y_coor]
            ]))
            if (this.isValidCoordinate(x_coor, y_coor + 1, current_path)) queue.push(current_path.concat([
                [x_coor, y_coor + 1]
            ]))
            if (this.isValidCoordinate(x_coor, y_coor - 1, current_path)) queue.push(current_path.concat([
                [x_coor, y_coor - 1]
            ]))
        }
    }

    calc_manhatten_dist(pacman_location, i, j) {
        let coor_x = pacman_location[0];
        let coor_y = pacman_location[1];
        return Math.abs(this.locationOngrid[0] + i) - coor_x + Math.abs(this.locationOngrid[1] + j) - coor_y;
    }

    update() {
        // let neighbor = this.find_path_to_pacman(pacman.locationOngrid)
        // get directions by order - best to worst
        let random_condition = Math.random() < (this.diff_level / (this.diff_level + 1))
        if ((!this.checkForTurnCollision(this.vx, this.vy) && random_condition) || this.collisionDetection()) {
            if (this.timer > 40) {
                this.diff_level++;
                this.timer = 0;
            }
            this.timer++;
            console.log(this.diff_level / (this.diff_level + 1))
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
        this.X += this.vx;
        this.Y += this.vy;
        this.locationOngrid = board.getLocation([this.X, this.Y]); //return the last location accurate on grid [x,y]
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


// if (!this.checkForTurnCollision(this.vx, this.vy) || this.collisionDetection()) {
//     let directions = {
//         "up": this.calc_manhatten_dist(pacman.locationOngrid, -1, 0),
//         "down": this.calc_manhatten_dist(pacman.locationOngrid, 1, 0),
//         "right": this.calc_manhatten_dist(pacman.locationOngrid, 0, 1),
//         "left": this.calc_manhatten_dist(pacman.locationOngrid, 0, -1),
//     };
//     let lowestValue = Math.min(...Object.entries(directions).map(o => o[1]));
//     let key = Object.keys(directions).find(key => directions[key] === lowestValue)
//         // console.log(key)
//     switch (key) {
//         case "up": //up
//             this.vx = 0;
//             this.vy = -2;
//             break;
//         case "down": //down
//             this.vx = 0;
//             this.vy = 2;
//             break;
//         case "right": //right
//             this.vx = 2;
//             this.vy = 0;
//             break;
//         case "left": //left
//             this.vx = -2;
//             this.vy = 0;
//             break;
//     }
// }