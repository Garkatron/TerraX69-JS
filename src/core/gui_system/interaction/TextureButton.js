import Sprite2D from '../../texture_system/Sprite2D';
import GObject from '../GObject';
import Button from './Button';

export default class TextureButton extends Button {
    constructor(p, texture, w, h, label=null, x = 12, y = 12) {
        super(p, label, w, h, x, y);
        this.label = label;
        this.texture = new Sprite2D(texture);
        this.bgColor = p.color(200);
        this.textColor = p.color(0);
        this.onClick = null;

        // Asignar evento de mouse click
    }

    setOnClick(callback) {
        this.onClick = callback;
        return this;
    }

    draw() {
        this.texture.x = this.x;
        this.texture.y = this.y;
        this.texture.draw();
        if(this.label) {
            this.p.fill(255);
            this.p.textSize(15);
            this.p.textFont('Courier New');
            this.p.text(this.label, this.x, this.y+32);
        }
    }

    update() {

    }

    handleMousePressed() {
        this.checkClick(this.p.mouseX, this.p.mouseY);
    }

    checkClick(mx, my) {
        if (
            mx > this.x && mx < this.x + this.w &&
            my > this.y && my < this.y + this.h
        ) {
            if (this.onClick) {
                this.onClick();
            }
        }
    }
}
