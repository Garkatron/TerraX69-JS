import Turntable from "../../../core/sound_system/Turntable";
import Util from "../../../core/util/Util";
import { DIRECTION, OBSTACLE } from "../../constants";
import Global from "../../Global";
import ItemWeapon from "../../items/weapons/ItemWeapon";
import Entity from "../Entity";
import Player from "./Player";
import Robot from "./Robot";

export default class Enemy extends Entity {
    constructor(world, id, name, shiftManager) {
        super(world, id, name, shiftManager);
        this.dirs = [
            DIRECTION.EAST,
            DIRECTION.NORTH,
            DIRECTION.SOUTH,
            DIRECTION.WEST,
            DIRECTION.NONE
        ];
        this.combatMode = false;
    
    }

    getRngAttackDamage() {
        const w = this.getItemsOf(ItemWeapon);
        return w[Util.randi(0, w.length)].item.damage;
    }

    useAttack() {
        let t3 = this.shiftManager.requestShift(this, 1, "enemy attack");
        let t4 = this.shiftManager.useShift(this);
        return this.getRngAttackDamage();
    }

    move() {
        let t1 = this.shiftManager.requestShift(this, 1, "enemy control");
        let t2 = this.shiftManager.useShift(this);

        if (!this.combatMode && t2) {
            this.px = this.x;
            this.py = this.y;

            let newDir = this.p5.random(this.dirs);
            let newX = this.x;
            let newY = this.y;

            switch (!this.combatMode && newDir) {
                case DIRECTION.EAST: {
                    newX += 1;
                    this.direction = DIRECTION.EAST;
                    break;
                }
                case DIRECTION.WEST: {
                    newX -= 1;
                    this.direction = DIRECTION.WEST;

                    break;
                }
                case DIRECTION.SOUTH: {
                    newY += 1;
                    this.direction = DIRECTION.SOUTH;

                    break;
                }
                case DIRECTION.NORTH: {
                    newY -= 1;
                    this.direction = DIRECTION.NORTH;
                    break;
                }
                case DIRECTION.NONE: {
                    break;
                }
            }


            if (this._canMove(newX, newY)) {
                this.x = newX;
                this.y = newY;
            }

        }
    }

    update() {
        super.update();
        this.move();
    }

    draw() {
        super.draw();
        this.drawViewPos();
    }

}