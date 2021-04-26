///This is super class for Moving objects


class MoveObject {
    constructor(X, Y, vx, vy, center_point,name = "asd") {
        this.name = name;
        this.X = X;
        this.Y = Y;
        this.locationOngrid = [0, 0]
        this.vx = vx;
        this.vy = vy;
        this.center_point = center_point;
    }

    checkRealPoint() {
        // check real point of pacman - canvas draw squre(0,0) - pacman(10+10)

        let real_x = this.locationOngrid[0];
        let real_y = this.locationOngrid[1];
        let px_x = Math.floor(real_x * board.wall_size + board.startLocation[0] + this.center_point); //change here for ghost img!
        let px_y = Math.floor(real_y * board.wall_size + board.startLocation[1] + this.center_point);
        let f_X = Math.floor(this.X);
        let f_Y = Math.floor(this.Y);

        if ((px_x - 1 <= f_X && f_X < px_x + 1) && (px_y - 1 <= f_Y && f_Y < px_y + 1)) return true;

        return false;
    }

    // Check for front collision
    collisionDetection() {
        var vel_x = 0;
        var vel_y = 0;
        if (this.vx != 0) vel_x = this.vx / Math.abs(this.vx); // get +1/-1 to get the next location
        if (this.vy != 0) vel_y = this.vy / Math.abs(this.vy);

        var NextX_Y = [this.X, this.Y]; //(board.wall_size/2)
        var Next_location = board.getLocation(NextX_Y);
        var isWall = grid[Next_location[1] + vel_y][Next_location[0] + vel_x] == 3;

        if (isWall && this.checkRealPoint()) {
            return true;
        }

        return false;
    }

    // Check if can turn  -->>> need to add accurate!can turn on the right px.

    checkForTurnCollision(vx, vy) {

        if (!this.checkRealPoint()) return true;

        if (vx > 0) { //right
            if (grid[this.locationOngrid[1]][this.locationOngrid[0] + 1] == 3) return true;
        } else if (vx < 0) { //left
            if (grid[this.locationOngrid[1]][this.locationOngrid[0] - 1] == 3) return true;
        } else if (vy > 0) { //down
            if (grid[this.locationOngrid[1] + 1][this.locationOngrid[0]] == 3) return true;
        } else if (vy < 0) { //up
            if (grid[this.locationOngrid[1] - 1][this.locationOngrid[0]] == 3) return true;
        }

        return false;
    }


    checkIfEdge() {
        if (this.locationOngrid[0] == 27 && this.locationOngrid[1] == 14 && this.vx > 0 && this.vy == 0) {
            return board.getPixel([0, 14]);
        } else if (this.locationOngrid[0] == 0 && this.locationOngrid[1] == 14 && this.vx < 0 && this.vy == 0) {
            return board.getPixel([27, 14]);
        } else return false;
    }

}