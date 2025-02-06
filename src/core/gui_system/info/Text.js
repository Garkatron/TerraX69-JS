import GObject from "../GObject";
import TEXT_ALING from "./TextAling";

export default class Text extends GObject {
    constructor(p, text, w = 100, h = 20, x = 0, y = 0) {
        super(p, w, h, x, y);
        this.text = text;
        this.text_aling = TEXT_ALING.LEFT;
        this.setAlign(this.text_aling);
    }

    setAlign(align) {
        this.text_aling = align;

        const alignMap = {
            [TEXT_ALING.LEFT]: this.p.LEFT,
            [TEXT_ALING.RIGHT]: this.p.RIGHT,
            [TEXT_ALING.CENTER]: this.p.CENTER,
            [TEXT_ALING.JUSTIFY]: this.p.JUSTIFY
        };

        this._text_aling = alignMap[align] || this.p.LEFT;
        return this;
    }

    setText(text) {
        this.text = text;
        return this;
    }

    draw() {
        this.p.push();
        this.p.fill(255);
        this.p.textSize(20);
        this.p.textAlign(this._text_aling, this.p.TOP);
        this.p.text(this.text, this.x, this.y);
        this.p.pop();
    }

    update() {
    }
}
