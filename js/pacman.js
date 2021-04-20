class Pacman extends MoveObject {
    constructor(X, Y, vx, vy, center_point) {
        super(X, Y, vx, vy, center_point);
        // this.width = 20;
        // this.height = 20;
        this.body_radius = wall_size * 8 / 20;
        this.start_angle = 0.15;
        this.finish_angle = 1.85;
        this.next_vx = 0;
        this.next_vy = 0;
    }

    update() {
        // if (this.Y + this.vx > board.wall_size) {

        if (this.collisionDetection()) {
            this.vx = 0;
            this.vy = 0;
        }
        if (!this.checkForTurnCollision(this.next_vx, this.next_vy)) { // true - false 
            this.vx = this.next_vx;
            this.vy = this.next_vy;
            this.changeDirection(this.vx, this.vy);
        }
        this.X += this.vx;
        this.Y += this.vy;
        this.locationOngrid = board.getLocation([this.X, this.Y]); //return the last location accurate on grid [x,y]

    }

    setVelocity(vx, vy) {
        this.locationOngrid = board.getLocation([this.X, this.Y]);
        this.next_vx = vx;
        this.next_vy = vy;
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