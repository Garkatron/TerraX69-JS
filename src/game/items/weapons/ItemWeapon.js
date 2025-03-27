
import ItemTool from '../tools/ItemTool';
import Item from './../../../core/item_system/Item';
export default class ItemWeapon extends ItemTool {
    constructor(id, name, description, durability = 100, damage = 1) {
        super(id, name, description, durability);
        this.damage = damage;
    }

    use(player, world) {
        return false;
    }
}