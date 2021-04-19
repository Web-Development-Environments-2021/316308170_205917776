


class Pacman extends MoveObject{
    constructor(X,Y,vx,vy) {
        super(X,Y,vx,vy);
        // this.width = 20;
        // this.height = 20;
        this.body_radius = 8;
        this.start_angle = 0.15;
        this.finish_angle = 1.85;
    }

    update() {       
        // if (this.Y + this.vx > board.wall_size) {
        collisionDetection()
        this.X += this.vx;
        this.Y += this.vy;
        this.locationOngrid =  board.getLocation([this.X,this.Y]); //return the last location accurate on grid [x,y]
        
    }

    setVelocity(vx, vy) {
        this.locationOngrid =  board.getLocation([this.X,this.Y]);
        if (this.checkForTurnCollision(vx,vy)) return; // true - false 
        this.vx = vx;
        this.vy = vy;
        this.changeDirection(vx, vy);
    }

    changeDirection(vx, vy) {
        if (vx > 0) { //right
            this.start_angle = 0.15
            this.finish_angle = 1.85
        } else if (vx < 0) { //left
            this.start_angle = 1.15
            this.finish_angle = 0.85
        } else if (vy > 0) { //down
            this.start_angle = 0.65
            this.finish_angle = 0.35
        } else if (vy < 0) { //up
            this.start_angle = 1.65
            this.finish_angle = 1.35
        }
    }

    draw(mouth_open) {
        if (mouth_open < 5) {
            context.beginPath();
            context.arc(this.X, this.Y, this.body_radius, this.start_angle * Math.PI, this.finish_angle * Math.PI); // half circle
            context.lineTo(this.X, this.Y);
            context.fillStyle = "yellow"; //color
            context.fill();
        } else {
            context.beginPath();
            context.arc(this.X, this.Y, this.body_radius, 0 * Math.PI, 2 * Math.PI); // full circle
            context.lineTo(this.X, this.Y);
            context.fillStyle = "yellow"; //color
            context.fill();
        }
    }
}