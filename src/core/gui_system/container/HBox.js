import GObject from "./GObject";

export default class HBox extends GObject {
    constructor(p, w=200, h=200, x=0, y=0) {
        super(p, w, h, x, y);
        
    }


    draw() {
        this.p.strokeWeight(2);
        this.p.stroke("black");
        this.p.fill(this.p.color(0, 0, 0, 128));
        this.p.rect(this.x, this.y, this.w, this.h, 10);
        this.p.noStroke();

        let lx = this.x;

        this.content.forEach(f => {
            lx += f.w;
            f.x = lx;
            f.y = this.y;
            f.draw();
        });
    }
}