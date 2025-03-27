import Resource from "../Resource";
import ImageResource from "./ImageResource";

export default class AnimResource extends ImageResource {
    constructor(name, frames, w, h, smooth = false) {
        super(name);
        this.frames= frames;
        this.width = w;
        this.height = h;
        this.smooth = smooth;
    }
}