///This is super class for Moving objects


class MoveObject{
    constructor(X,Y,vx,vy,center_point){
        this.X = X;
        this.Y = Y;
        this.locationOngrid = [0,0] 
        this.vx = vx;
        this.vy = vy;
        this.center_point = center_point;
    }

    checkRealPoint(){
        // check real point of pacman - canvas draw squre(0,0) - pacman(10+10)
    
        var real_x = this.locationOngrid[0];
        var real_y = this.locationOngrid[1];
        var px_x = Math.floor(real_x * board.wall_size + board.startLocation[0] + this.center_point); //change here for ghost img!
        var px_y = Math.floor(real_y * board.wall_size + board.startLocation[1] + this.center_point);

        if(px_x == Math.floor(this.X) && px_y == Math.floor(this.Y)) return true;
        
        return false;
    }
    
    // Check for front collision
    collisionDetection(){
        var vel_x = 0;
        var vel_y = 0;
        if (this.vx != 0) vel_x = this.vx / Math.abs(this.vx); // get +1/-1 to get the next location
        if (this.vy != 0) vel_y = this.vy / Math.abs(this.vy);
    
        var NextX_Y = [this.X , this.Y ];//(board.wall_size/2)
        var Next_location = board.getLocation(NextX_Y);
        var isWall = grid[Next_location[1] + vel_y][Next_location[0] + vel_x] == 3;

        if(isWall && this.checkRealPoint()){
            // console.log(Next_location, " vx: ", vel_x," vy : ", vel_y)
            return true;
        } 
        
        return false;
    }

    // Check if can turn  -->>> need to add accurate!can turn on the right px.

    checkForTurnCollision(vx,vy){

        if(!this.checkRealPoint()) return true;

        if (vx > 0) { //right
            if(grid[this.locationOngrid[1]][this.locationOngrid[0]+ 1] == 3) return true;  
        } else if (vx < 0) { //left
            if(grid[this.locationOngrid[1]][this.locationOngrid[0] - 1] == 3) return true;
        } else if (vy > 0) { //down
            if(grid[this.locationOngrid[1] + 1 ][this.locationOngrid[0]] == 3) return true;
        } else if (vy < 0) { //up
            if(grid[this.locationOngrid[1]- 1][this.locationOngrid[0]] == 3) return true; 
        }

        return false;
    }
}