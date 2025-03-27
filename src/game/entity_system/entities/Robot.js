import ItemStack from '../../../core/item_system/ItemStack';
import Turntable from '../../../core/sound_system/Turntable';
import Global from '../../Global';
import { ITEM_ROBOT_ATTACK_0 } from '../../items/items';
import Enemy from './Enemy';
export default class Robot extends Enemy {
    constructor(world, id, name, shiftManager) {
        super(world, id, name);
        this.shiftManager = shiftManager;

        this.inventory.addItemStack(new ItemStack(ITEM_ROBOT_ATTACK_0, 1000));

        this.turntable = new Turntable(
            {
                "hurt.0": new Global().getResource("sfx.hurt.robot.0"),
                "hurt.1": new Global().getResource("sfx.hurt.robot.1"),
                "hurt.2": new Global().getResource("sfx.hurt.robot.2"),
            }
        );
    }


    hurt(amount) {
        this.turntable.play(this.p5.random(["hurt.0","hurt.1","hurt.2"]));
        const r = this.life - amount;
        if (r > 0) {
            this.life = r;
            return "hurt";
        } else {
            this.world.removeEntity(this);
            this.shiftManager.removeUser(this);
            return "dead";
        }
    }

}