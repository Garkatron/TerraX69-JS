import Global from "../../Global";
import TileObject from "../TileObject";
import Sprite2D from './../../../core/texture_system/Sprite2D';
import { TILE_SIZE } from './../../constants';

export default class CSFlower extends TileObject {
    constructor(world, id, textureId) {
        super(world, id, "CSFlower", textureId);
        this.offsetX = 0; 
        this.time = 0; 
    }
    draw() {
        this.p5.push();
    
        this.offsetX = Math.sin(this.time) * 10;
        this.time += 0.01; 
    
        let pivotX = (this.x + 0.5) * TILE_SIZE;
        let pivotY = (this.y + 0.8) * TILE_SIZE;
        this.p5.translate(pivotX, pivotY);
    
        this.p5.rotate(Math.max(-0.2, Math.min(this.offsetX, 0.2)));
    
    
        let offsetTextureX = -TILE_SIZE / 2;
        let offsetTextureY = -TILE_SIZE * 0.9; 
    
        this.texture.x = offsetTextureX;
        this.texture.y = offsetTextureY;
        this.texture.draw();
    
        this.p5.pop();
    }
    
}
