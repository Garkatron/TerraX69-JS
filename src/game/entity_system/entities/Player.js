import Entity from '../Entity';
import { DIRECTION, OBSTACLE, TILE_SIZE } from '../../constants';
import ItemStackContainer from '../../../core/item_system/ItemStackContainer';
import Signal from '../../../core/util/Signal';
import { onKeyReleased } from '../../../core/Engine';
import WorldCaveScene from './../../scenes/WorldCaveScene';
import CaveEntranceObject from './../../object_system/objects/CaveEntranceObject';
import ItemStackObject from '../../object_system/objects/ItemStackObject';
import TileObject from '../../object_system/TileObject';
import ItemStack from './../../../core/item_system/ItemStack';

export default class Player extends Entity {
    constructor(world, id, name) {
        super(world, id, name);

        // Stats
        this.armor = new ItemStackContainer(3);

        this.hunger = 100;
        this.dry = 100;

        // Inv
        this.hudSelectItemSignal = new Signal();
        this.hudSelectItemSignal.connect((slot) => {
            this.selectedItem = this.inventory.getFromSlot(slot);
        });

        onKeyReleased.connect((k, kc) => {
            if (kc === 81 && this.selectedItem != null) {
                this.inventory.dropQuantityOf(this.selectedItem, 1);
                const obj = new ItemStackObject(this.world, new ItemStack(this.selectedItem.item, 1), 0)
                if (obj != null) {
                    const p = this.getViewPos();
                    obj.setX(p.x);
                    obj.setY(p.y);
                    this.world.addObject(obj);
                    if (this.selectedItem.quantity <= 0) {
                        this.selectedItem = null;
                    }
                }
            }
        });


        this.selectedItem = this.inventory.getFromSlot(0);


        // Battle Stats

        this.strenght = 1;

    

        // Hunger System

        this.foodToDigest = [];
        this.Digestedfood = [];
        this.digestSeconds = 100;
        this.currentDigestSeconds = 0;

        // --
    }

    digest() {

    }

    update() {
        super.update();
        this.updateControl(this.world);

    }

    draw() {
        super.draw();
        this.drawViewPos();
    }

    _canMove(x, y) {
        let chunk = this.world.getChunkAt(x, y);

        let localX = x - (chunk.x * chunk.size);
        let localY = y - (chunk.y * chunk.size);

        //console.log(localX, localY);


        let currentTileId = chunk.getTileId(localX, localY);
        return !OBSTACLE.includes(currentTileId);
    }



    updateControl() {
        this.px = this.x;
        this.py = this.y;

        let newX = this.x;
        let newY = this.y;

        if (this.p5.keyIsDown(this.p5.UP_ARROW) || this.p5.keyIsDown(87)) {
            newY -= 1;
            this.direction = DIRECTION.NORTH;
        }
        if (this.p5.keyIsDown(this.p5.LEFT_ARROW) || this.p5.keyIsDown(65)) {
            newX -= 1;
            this.direction = DIRECTION.WEST;
        }
        if (this.p5.keyIsDown(this.p5.RIGHT_ARROW) || this.p5.keyIsDown(68)) {
            newX += 1;
            this.direction = DIRECTION.EAST;
        }
        if (this.p5.keyIsDown(this.p5.DOWN_ARROW) || this.p5.keyIsDown(83)) {
            newY += 1;
            this.direction = DIRECTION.SOUTH;
        }
        if (this.p5.keyIsDown(69) && this.selectedItem != null) {
            this.selectedItem.use(this, this.world);
        }

        if (this._canMove(newX, newY)) {
            this.x = newX;
            this.y = newY;
        }
    }

    setWorld(world) {
        this.world = world;
        return this;
    }

    handleCollision(object) {
        console.log(object instanceof CaveEntranceObject);
        
        if (object instanceof ItemStackObject) {
            const itemStack = object.itemStack;
            this.inventory.addItemStack(itemStack);
            this.world.removeObject(object);

        } else if (object instanceof CaveEntranceObject) {
            console.log("AAAAAA");
            

            /*
            let sceneManager = new Global().sceneManager;
            let currentScene = sceneManager.currentScene;

            if (currentScene instanceof WorldScene) {


                // Remove player from world
                //sceneManager.currentScene.world.removeEntity(this);

                // Change to caves world
                sceneManager.changeScene(1);

                // Set new world to player
                this.setWorld(sceneManager.currentScene.world);

            } else if (currentScene instanceof WorldCaveScene) {
                // Remove player from world
                // sceneManager.currentScene.world.removeEntity(this);

                // Change world
                sceneManager.changeScene(0);

                // Set world
                this.setWorld(sceneManager.currentScene.world);


            }
                */

        } else {

        }

    }






}
