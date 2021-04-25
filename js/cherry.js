class Cherry extends Ghost {
    constructor(X, Y, vx, vy, sx, sy, size) {
        super(X, Y, vx, vy, sx, sy, size);
        this.id = 11;
        this.img = cherry_img
        this.img_width = 1201;
        this.img_height = 1201;
        this.eaten = false;
    }
}