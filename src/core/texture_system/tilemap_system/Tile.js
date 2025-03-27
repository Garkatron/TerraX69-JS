import Object2D from "../../base_stuff/Object2D";
import MetaData from "../../data_management/MetaData";
import AnimResource from "../../resource_system/resources/AnimResource";
import Sprite2D from "../Sprite2D";
import AnimatedSprite2D from './../AnimatedSprite2D';

export default class Tile extends Object2D {
    constructor(texture) {
        super(0, 0);
        this.metadata = new MetaData();
        if (texture instanceof AnimResource) {
            this.texture = new AnimatedSprite2D(texture);
        } else {
            this.texture = new Sprite2D(texture);

        }
        this.id = texture.name;
    }

    draw() {
        this.texture.x = this.x;
        this.texture.y = this.y;
        this.texture.draw();
    }

    update() {
        this.texture.update();
    }
}