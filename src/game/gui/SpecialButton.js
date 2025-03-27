import Button from "../../core/gui_system/interaction/Button";
import Global from "../Global";

export default class SpecialButton extends Button {
    constructor(p, labelText = null, w, h, x = 0, y = 0) {
        super(p, labelText, w, h, x, y);
        this.global = new Global();
    }
    isHover(mx, my) {
        return this.global.camera.mouseX > this.x && this.global.camera.mouseX < this.x + this.w && this.global.camera.mouseY > this.y && this.global.camera.mouseY < this.y + this.h;
    }
}