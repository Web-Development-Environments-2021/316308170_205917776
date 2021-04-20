

class Ghost extends MoveObject{
    constructor(X,Y,vx,vy,sx,sy,size,velocity){
        super(X,Y,vx,vy,0);
        this.img_locations = {
            "up" : [sx + 190, sy],
            "down" : [sx , sy + 190],
            "left" : [sx + 190, sy + 190],
            "right" : [sx, sy]
        };
        this.direction = this.img_locations["right"];
        this.size = size;
        this.move_direction = {
            "up":[0,-velocity],
            "down":[0,velocity],
            "left":[-velocity,0],
            "right":[velocity,0]
        }
    }



    update() {       
        // get directions by order - best to worst
        let distance = Number.MAX_SAFE_INTEGER;
        var best_direction = "";
        for (var key in this.move_direction){
            if(!this.checkForTurnCollision(this.move_direction[key][0],this.move_direction[key][1])){
                let current_distance = Math.sqrt(Math.pow((pacman.X-Math.abs(this.X+this.move_direction[key][0])),2) + Math.pow((pacman.Y-Math.abs(this.Y+this.move_direction[key][1])),2));
                if(current_distance < distance){
                    distance = current_distance;
                    best_direction = key;
                }
            }
        }  
        console.log(this.move_direction , "=========", best_direction);
        if(best_direction != ""){
            this.direction = this.img_locations[best_direction];
            this.vx = this.move_direction[best_direction][0];
            this.vy = this.move_direction[best_direction][1];
         }
        if(this.collisionDetection()) {
            // this.vx = 0;
            // this.vy = 0;
        }
        
        this.changeDirection(this.vx,this.vy)
        this.X += this.vx;
        this.Y += this.vy;
        this.locationOngrid =  board.getLocation([this.X,this.Y]); //return the last location accurate on grid [x,y]
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