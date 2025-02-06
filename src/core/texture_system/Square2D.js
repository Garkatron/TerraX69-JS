import Drawable from "../base_stuff/Drawable";

export default class Square2D extends Drawable {
    constructor(p, size, color) {
        super(0,0);
        this.size = size;
        this.color = color;
        this.p = p;
    }

    draw() {
        this.p.noStroke();
        //this.p.strokeWeight(1);

        this.p.fill(this.color);
        this.p.square(x, y, this.size);
    }
}