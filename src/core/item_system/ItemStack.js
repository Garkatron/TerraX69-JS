
import ItemTool from './../../game/items/tools/ItemTool';
export default class ItemStack {
    constructor(item, quantity = 1) {
        if (!item || typeof item !== "object") {
            throw new Error("Item must be a valid object.");
        }
        if (quantity < 1) {
            throw new Error("Quantity must be greater than 0.");
        }
        this.usable = item instanceof ItemTool;
        this.quantity = quantity;
        this.item = item;
        this.currentDurability = this.usable ? item.durability : null;
    }
    static newFromStack(itemStack) {
        return new ItemStack(itemStack.item, itemStack.quantity);
    }

    getItemId() {
        return this.item.id;
    }

    getQuantity() {
        return this.quantity;
    }

    addQuantity(amount) {
        if (amount < 0) {
            throw new Error("Amount to add must be non-negative.");
        }
        this.quantity += amount;
    }

    removeQuantity(amount) {
        if (amount < 0) {
            throw new Error("Amount to remove must be non-negative.");
        }
        if (amount > this.quantity) {
            throw new Error("Cannot remove more than the current quantity.");
        }
        this.quantity -= amount;
    }

    _canUse() {
        return this.usable ? this.currentDurability > 0 && this.quantity > 0 : this.quantity > 0;
    }

    _broke() {
        if (this.usable) {
            this.currentDurability--;
            if (this.currentDurability <= 0) {
                if (this.quantity > 1) {
                    this.quantity--;
                    this.currentDurability = this.item.durability;
                } else {
                    this.quantity = 0;
                    this.currentDurability = 0;
                }
            }
        }
    }

    use(player, world) {
        if (this._canUse()) {
            if (this.item.use(player, world)) {
                this._broke();
                return true;
            }
            return false;
        }
        return false;
    }

  
}
