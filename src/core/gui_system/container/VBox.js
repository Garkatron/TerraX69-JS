import GObject from "../GObject";

export default class VBox extends GObject {
    constructor(p, w=200, h=200, x=0, y=0) {
        super(p, w, h, x, y);
        
    }


    draw() {
        this.p.strokeWeight(2);
        this.p.stroke("black");
        this.p.fill(this.p.color(0, 0, 0, 128));
        this.p.rect(this.x, this.y, this.w, this.h, 10);
        this.p.noStroke();

        let ly = this.y;

        this.content.forEach(f => {
            ly += f.h;
            f.x = this.x;
            f.y = ly;
            f.draw();
        });
    }
}