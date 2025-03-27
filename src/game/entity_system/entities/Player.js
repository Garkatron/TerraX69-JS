import { Howl } from 'howler';
import { onKeyPressed, onKeyReleased } from '../../../core/Engine';
import ItemStackContainer from '../../../core/item_system/ItemStackContainer';
import Turntable from '../../../core/sound_system/Turntable';
import Signal from '../../../core/util/Signal';
import { DIRECTION, getOppositeDirection, TILE_SIZE } from '../../constants';
import AttackMenu from '../../gui/combat/AttackMenu';
import ItemStackObject from '../../object_system/objects/ItemStackObject';
import Entity from '../Entity';
import ItemStack from './../../../core/item_system/ItemStack';
import CaveEntranceObject from './../../object_system/objects/CaveEntranceObject';
import Robot from './Robot';
import Global from './../../Global';
import Pet from './Pet';
import ItemWeapon from '../../items/weapons/ItemWeapon';

export default class Player extends Entity {
    constructor(world, id, name, shiftManager) {
        super(world, id, name, shiftManager);
        // Stats
        this.armor = new ItemStackContainer(3);
        this.attackMenu = new AttackMenu(this);
        this.pets = [];
        this.attackMenu.setup();

        this.turntable = new Turntable(
            {
                "step0": new Global().getResource("sfx.step.0"),
                "step1": new Global().getResource("sfx.step.1"),
                "step2": new Global().getResource("sfx.step.2"),
                "pickup.item.0": new Global().getResource("sfx.item.pickup"),
                "item.drop.0": new Global().getResource("sfx.item.drop.0"),
                "item.drop.1": new Global().getResource("sfx.item.drop.1"),
                "item.drop.2": new Global().getResource("sfx.item.drop.2"),

            }
        );


        this.currentEnemy = null;
        this.combatMode = false;

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
                    this.turntable.play(this.p5.random(["item.drop.0", "item.drop.1", "item.drop.2"]));

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

        onKeyPressed.connect((e) => {
            this.updateControl();
        });
    }

    digest() {

    }

    update() {
        super.update();
        if (this.combatMode) {
            this.attackMenu.update();
        }

    }

    draw() {
        super.draw();
        this.drawViewPos();
        if (this.combatMode) {
            this.attackMenu.draw();

        }
    }

    getItemFromPetsOf(someClass) {        
        const content = [
            ...this.pets.flatMap(pet => pet.inventory.getContent())
        ];
        
        const w = content.filter((stack) => stack != null && stack.item instanceof someClass);
        return w;
    }

    useAttack(name) {
        let t3 = this.shiftManager.requestShift(this, 1, "player attack");
        let t4 = this.shiftManager.useShift(this);
    
        return this.getItemsOf(ItemWeapon).find(stack => stack.item.name === name);
    }
    
    getItemsOf(someClass, includePets = true) {        
        const petContent = [];
    
        if (includePets) {
            this.pets.forEach(pet => {
                petContent.push(...pet.inventory.getContent());
            });
        }
    
        const content = [
            ...this.inventory.getContent(),
            ...petContent
        ];
    
        return content.filter(stack => stack && stack.item instanceof someClass);
    }
    
    updateControl() {

        let t1 = this.shiftManager.requestShift(this, 1, "player control");
        let t2 = this.shiftManager.useShift(this);

        if (!this.combatMode && t2) {
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
                this.turntable.play(this.p5.random(["step0", "step1", "step2"]));
            }
        }

    }

    setWorld(world) {
        this.world = world;
        return this;
    }

    handleCollision(object) {
        if (object instanceof ItemStackObject) {
            const itemStack = object.itemStack;
            this.inventory.addItemStack(itemStack);
            this.world.removeObject(object);
            this.turntable.play("pickup.item.0");

        } else if (object instanceof Pet) {
            const can = object.domesticate(this, this.pets.at(-1))
            if (can) { this.pets.push(object); }

        } else if (object instanceof CaveEntranceObject) {



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
        } else if (object instanceof Robot) {
            this.combatMode = true;
            object.combatMode = true;
            this.currentEnemy = object;

            this.px = this.x;
            this.py = this.y;
            let newX = this.x;
            let newY = this.y;
            switch (getOppositeDirection(object.direction)) {
                case DIRECTION.EAST: {
                    newX += 1;
                    this.direction = DIRECTION.EAST;
                    this.attackMenu.x = (this.x + 4) * TILE_SIZE;
                    this.attackMenu.y = this.y * TILE_SIZE;
                    break;
                }
                case DIRECTION.WEST: {
                    newX -= 1;
                    this.direction = DIRECTION.WEST;
                    this.attackMenu.x = (this.x - 4) * TILE_SIZE;
                    this.attackMenu.y = this.y * TILE_SIZE;
                    break;
                }
                case DIRECTION.SOUTH: {
                    newY += 1;
                    this.direction = DIRECTION.SOUTH;
                    this.attackMenu.x = this.x * TILE_SIZE;
                    this.attackMenu.y = (this.y + 4) * TILE_SIZE;
                    break;
                }
                case DIRECTION.NORTH: {
                    newY -= 1;
                    this.attackMenu.x = this.x * TILE_SIZE;
                    this.attackMenu.y = (this.y - 4) * TILE_SIZE;
                    this.direction = DIRECTION.NORTH;
                    break;
                }
                case DIRECTION.NONE: {
                    break;
                }
            }
            this.attackMenu.refresh();

            if (this._canMove(newX, newY)) {
                this.x = newX;
                this.y = newY;
            }
        } else {

        }

    }






}
