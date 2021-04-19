///This is super class for Moving objects


class MoveObject{
    constructor(X,Y,vx,vy){
        this.X = X;
        this.Y = Y;
        this.locationOngrid = [0,0] 
        this.vx = vx;
        this.vy = vy;
    }

    // Check for front collision
    collisionDetection(){
        var NextX_Y = [this.X + vx, this.Y + vy];
        var Next_location = board.getLocation(NextX_Y);

    }

    // Check if can turn  -->>> need to add accurate!can turn on the right px.

    checkForTurnCollision(){
        if (vx > 0) { //right
            if(grid[this.locationOngrid[1]][this.locationOngrid[0]+1] == 3) return true;  
        } else if (vx < 0) { //left
            if(grid[this.locationOngrid[1]][this.locationOngrid[0]-1] == 3) return true;
        } else if (vy > 0) { //down
            if(grid[this.locationOngrid[1]+1][this.locationOngrid[0]] == 3) return true;
        } else if (vy < 0) { //up
            if(grid[this.locationOngrid[1]-1][this.locationOngrid[0]] == 3) return true; 
        }

        return false;
    }
}