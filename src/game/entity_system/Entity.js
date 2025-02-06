import TileObject from './../../game/object_system/TileObject';
import ItemStackContainer from './../../core/item_system/ItemStackContainer';
import Global from '../Global';
import Sprite2D from './../../core/texture_system/Sprite2D';
import { ARROW, DIRECTION, TILE_SIZE } from '../constants';
import Util from '../../core/util/Util';
export default class Entity extends TileObject {
    constructor(world, id, name) {
        super(world, id, name);

        this.arrow = {
            ARROW_LEFT: new Sprite2D(new Global().getResource("ARROW_LEFT")),
            ARROW_RIGHT: new Sprite2D(new Global().getResource("ARROW_RIGHT")),
            ARROW_DOWN: new Sprite2D(new Global().getResource("ARROW_DOWN")),
            ARROW_UP: new Sprite2D(new Global().getResource("ARROW_UP"))
        }

        this.texture = new Sprite2D(new Global().getResource(id));
        this.world = world;

        this.inventory = new ItemStackContainer(16)
        this.life = 100;

        this.direction = DIRECTION.EAST;

        this.currentChunk = this.getCurrentChunk();

        this.px = 0;
        this.py = 0;
        this.x = 0;
        this.y = 0;

        this.speed = 1.0;

    }

    update() {
        this.currentChunk = this.getCurrentChunk();
    }



    _canMove(x, y) {
        let chunk = this.world.getChunkAt(x, y);

        let localX = x - (chunk.x * chunk.size);
        let localY = y - (chunk.y * chunk.size);



        let currentTileId = chunk.getTile(localY, localX);

        return !OBSTACLE.includes(currentTileId);
    }

    getX() {
        return this.x - this.world.x;
    }

    getY() {
        return this.y - this.world.y;
    }


    setWorld(world) {
        this.world = world;
        return this;
    }

    handleCollision(object) {

    }

    getViewPos() {    
        let targetX = this.x;
        let targetY = this.y;
    
        switch (this.direction) {
            case DIRECTION.EAST:
                targetX += 1;
                break;
            case DIRECTION.WEST:
                targetX -= 1;
                break;
            case DIRECTION.SOUTH:
                targetY += 1;
                break;
            case DIRECTION.NORTH:
                targetY -= 1;
                break;
        }        
        return {x: targetX, y: targetY};
    }

    getTileForward() {
        let p = this.getViewPos();
        const chunk = this.getChunkForward();
        if (chunk==null) return null;
        const pos = Util.posGlobalToChunkLocal(p.x, p.y, this.currentChunk);

        return chunk.getTile(pos.x, pos.y);
    }

    getTileIdForward() {
        let p = this.getViewPos();
        const chunk = this.getChunkForward();
        if (chunk==null) return null;
        const pos = Util.posGlobalToChunkLocal(p.x, p.y, this.currentChunk);

        return chunk.getTileId(pos.x, pos.y);
    }


    drawViewPos() {
        let pos = this.getViewPos();
        this.p5.fill("YELLOW");
        //this.p5.square((pos.x*TILE_SIZE), (pos.y*TILE_SIZE), TILE_SIZE);
        const sprite = this.arrow[ARROW[this.direction]];
        sprite.x = (pos.x*TILE_SIZE);
        sprite.y = (pos.y*TILE_SIZE);
        sprite.draw();
    }

    getChunkForward() {
        let p = this.getViewPos();        
        const chunk = this.world.getChunkAt(p.x, p.y);        
        
        return chunk;
    }

    getLocalChunkCoords() {
        let p = Util.getPosNoSize(this.x, this.y);
        const pos = Util.posGlobalToChunkLocal(p.x, p.y, this.currentChunk);
          
        return {x:pos.x, y: pos.y};
    }

    getCurrentChunk() {
        const chunk = this.world.getChunkAt(this.x, this.y);
        return chunk;
    }

    getTileBelow() {
        let p = this.getLocalChunkCoords();
        return this.currentChunk.getTile(p.x, p.y);
    }
}
