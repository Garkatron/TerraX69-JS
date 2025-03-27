import ItemTool from './ItemTool';
import ItemStack from './../../../core/item_system/ItemStack';
import Util from './../../../core/util/Util';
import { DESTROYABLE, DESTROYABLE_LOOT, STONE_FLOOR } from '../../constants';
import Global from '../../Global';
import Turntable from '../../../core/sound_system/Turntable';
import EngineGlobal from '../../../core/EngineGlobal';

export default class ItemPickaxe extends ItemTool {
    constructor(id, name, description, durability = 100) {
        super(id, name, description);
        this.durability = durability;
    }

    setup() {
        this.turntable = new Turntable(
            {
                "destroy.stone.0": new Global().getResource("sfx.destroy.stone.0"),
                "destroy.stone.1": new Global().getResource("sfx.destroy.stone.1"),
                "destroy.stone.2": new Global().getResource("sfx.destroy.stone.2"),
            }
        );
    }

    use(player, world) {
        console.log("Using pickaxe...");
        return this.destroyTile(player, world);
    }


    destroyTile(player, world) {
        const tid = player.getTileIdForward();
        const chunk = player.getChunkForward();
        const vp = player.getViewPos();
        const viewPos = Util.posGlobalToChunkLocal(vp.x, vp.y, chunk);
        console.log(tid);
        if (tid == null) return false;
        if (this.canDestroy(tid)) {

            chunk.modifyTile(viewPos.x, viewPos.y, STONE_FLOOR);
            player.inventory.addItemStack(new ItemStack(DESTROYABLE_LOOT[tid], 1))
            this.turntable.play(new EngineGlobal().p5.random(["destroy.stone.0","destroy.stone.1","destroy.stone.2"]));

            return true;
        }
        return false;
    }




    canDestroy(tid) {
        return DESTROYABLE.includes(tid);
    }
}