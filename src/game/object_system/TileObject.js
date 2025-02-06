import Sprite2D from '../../core/texture_system/Sprite2D';
import { TILE_SIZE } from '../constants';
import Global from '../Global';
import Object2D from './../../core/base_stuff/Object2D';
export default class TileObject extends Object2D {
    constructor(world, id, name, textureId=null) {
        super(0, 0);
        this.id = id;
        this.world = world;
        this.name = name;
        this.x = 0;
        this.y = 0;

        this.textureId = textureId;
        this.texture = new Sprite2D(new Global().getResource(this.textureId));

    }
    
    handleCollision(object) {

    }
    
    draw() {
        this.texture.x = this.x*TILE_SIZE
        this.texture.y = this.y*TILE_SIZE
        this.texture.draw();
    }
}