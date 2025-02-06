import ItemTool from './ItemTool';
import ItemStack from './../../../core/item_system/ItemStack';
import Util from './../../../core/util/Util';
import { DESTROYABLE, DESTROYABLE_LOOT, STONE_FLOOR } from '../../constants';

export default class ItemPickaxe extends ItemTool {
    constructor(id, name, description, durability = 100) {
        super(id, name, description);
        this.durability = durability;
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

            return true;
        }
        return false;
    }
    
    
    
    
    canDestroy(tid) {    
       return DESTROYABLE.includes(tid);
    }
}