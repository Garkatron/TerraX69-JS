import Resource from "../Resource";

export default class ImageResource extends Resource {
    constructor(name, image, w, h, smooth = false) {
        super(name);
        this.image = image;
        this.width = w;
        this.height = h;
        this.smooth = smooth;
    }
}