
import Item from './../../../core/item_system/Item';
export default class ItemTool extends Item {
    constructor(id, name, description, durability = 100) {
        super(id, name, description);
        this.durability = durability;
    }

    use(player, world) {
        return false;
    }
}