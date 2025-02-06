import Signal from "../util/Signal";
import ItemStack from "./ItemStack";

export default class ItemStackContainer {
    constructor(size = 16, itemStacks = null) {
        this.size = size;
        this.itemStacks = itemStacks ? [...itemStacks] : new Array(size).fill(null);
        this.onContentModified = new Signal();
    }

    _refresh() {
        this.itemStacks = this.itemStacks.map(stack => (stack && stack.quantity > 0 ? stack : null));
        this.onContentModified.emit(this.getAsArray2D(20));
    }

    dropQuantity(slot = 0, quantity = 1) {
        this._refresh();
        const itemStack = this.getFromSlot(slot);
        
        if (!itemStack || itemStack.quantity <= 0) return false;

        if (quantity > itemStack.quantity) return false;

        itemStack.quantity -= quantity;
        if (itemStack.quantity === 0) {
            this.itemStacks[slot] = null;
        }
        this._refresh();
        return true;
    }

    
    dropQuantityOf(itemStack, quantity = 1) {
        const slot = this.getSlotOf(itemStack);
        if (slot === -1) return false;
        return this.dropQuantity(slot, quantity);         
    }

    getSlotOf(itemStack) {
        return this.itemStacks.findIndex(is => is === itemStack);
    }

    getFromSlot(index) {
        if (this._isIndexOutOfBounds(index)) {
            throw new Error(`Index ${index} is out of bounds for container of size ${this.size}.`);
        }
        return this.itemStacks[index];
    }

    setToSlot(index, itemStack) {
        if (this._isIndexOutOfBounds(index)) {
            throw new Error(`Index ${index} is out of bounds for container of size ${this.size}.`);
        }
        this.itemStacks[index] = itemStack;
        this._refresh();
    }

    isSlotEmpty(index) {
        if (this._isIndexOutOfBounds(index)) {
            throw new Error(`Index ${index} is out of bounds for container of size ${this.size}.`);
        }
        return this.itemStacks[index] === null;
    }

    addItemStack(itemStack) {
        this._refresh();
        const existingStackIndex = this.itemStacks.findIndex(slot => slot && slot.item === itemStack.item);

        if (existingStackIndex !== -1) {
            this.itemStacks[existingStackIndex].quantity += itemStack.quantity;
            console.log(`[EXISTING] Added Item at: ${existingStackIndex}`);
        } else {
            const emptyIndex = this.itemStacks.indexOf(null);
            if (emptyIndex === -1) {
                throw new Error("Container is full, cannot add more items.");
            }
            console.log(`[EMPTY] Added Item at: ${emptyIndex}`);
            this.itemStacks[emptyIndex] = itemStack;
        }
        this._refresh();
    }

    getAsArray2D(n_columns) {
        const arr2D = [];
        for (let i = 0; i < this.itemStacks.length; i += n_columns) {
            arr2D.push(this.itemStacks.slice(i, i + n_columns));
        }
        return arr2D;
    }

    _isIndexOutOfBounds(index) {
        return index < 0 || index >= this.size;
    }
}
