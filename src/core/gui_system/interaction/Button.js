import { onMousePressed } from "../../Engine";
import GObject from "../GObject";
import Text from './../info/Text';

export default class Button extends GObject {
    constructor(p, labelText = null, w, h, x = 0, y = 0) {
        super(p, w, h, x, y);
        this.bgColor = p.color(200);
        this.textColor = p.color(0);
        this.onClick = null;

        this.label = labelText instanceof Text 
            ? labelText 
            : new Text(p, labelText || "", w, h, x, y);

        onMousePressed.connect(() => this.checkClick(this.p.mouseX, this.p.mouseY));
    }

    modifyLabel(p = (label)=>{}){
        p(this.label);
        return this;
    }

    setOnClick(callback) {
        this.onClick = callback;
        return this;
    }

    draw() {
        this.bgColor = this.isHover(this.p.mouseX, this.p.mouseY) 
            ? this.p.color(255, 0, 0) 
            : this.p.color(0, 255, 0);

        this.p.fill(this.bgColor);
        this.p.rect(this.x, this.y, this.w, this.h, 2);

        if (this.label) {
            this.label.x = this.x + (this.w / 4);
            this.label.y = this.y + (this.h / 4)-5;
            this.label.setAlign(this.p.CENTER);
            this.label.draw();
        }
    }

    update() {}

    isHover(mx, my) {
        return mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h;
    }

    checkClick(mx, my) {
        if (this.isHover(mx, my) && this.onClick) {
            this.onClick();
        }
    }

    logMouseDistance() {
        let centerX = this.x + this.w / 2;
        let centerY = this.y + this.h / 2;
        let distance = Math.sqrt(Math.pow(this.p.mouseX - centerX, 2) + Math.pow(this.p.mouseY - centerY, 2));
        
        this.label.setText(distance.toFixed(2));
    }
}
