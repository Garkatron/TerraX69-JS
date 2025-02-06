import Resource from "../Resource";

export default class FontResource extends Resource {
    constructor(name, font) {
        super(name);
        this.font = font;
    }
}