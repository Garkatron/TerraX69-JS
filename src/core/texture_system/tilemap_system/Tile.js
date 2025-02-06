import Object2D from "../../base_stuff/Object2D";
import MetaData from "../../data_management/MetaData";
import Sprite2D from "../Sprite2D";

export default class Tile extends Object2D {
    constructor(texture) {
        super(0, 0);
        this.metadata = new MetaData();
        this.texture = new Sprite2D(texture);
        this.id = texture.name;
    }

    draw() {
        this.texture.x = this.x;
        this.texture.y = this.y;
        this.texture.draw();
    }
}