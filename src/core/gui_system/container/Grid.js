import GObject from "./GObject";

export default class Grid extends GObject {
    constructor(p, w = 200, h = 200, x = 0, y = 0) {
        super(p, w, h, x, y);
    }

    draw() {
        this.p.strokeWeight(2);
        this.p.stroke("black");
        this.p.fill(this.p.color(0, 0, 0, 128));
        this.p.rect(this.x, this.y, this.w, this.h, 10);
        this.p.noStroke();

        let startY = this.y + 20;

        this.content.forEach(row => {
            let currentX = this.x;
            let maxHeight = 0;
            row.forEach(cell => {
                cell.x = currentX;
                cell.y = startY;
                cell.draw();
                currentX += cell.w;
                if (cell.h > maxHeight) {
                    maxHeight = cell.h;
                }
            });
            startY += maxHeight;
        });
        
    }
}