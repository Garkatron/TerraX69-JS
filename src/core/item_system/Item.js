export default class Item {
    constructor(id, name, description = "") {
        if (typeof description !== "string") {
            throw new Error("Description must be a string.");
        }

        this.id = id;
        this.name = name;
        this.description = description;
    }

    setDurability(value) {  
        this.durability = value;
        return this;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    setDescription(description) {
        if (typeof description !== "string") {
            throw new Error("Description must be a string.");
        }
        this.description = description;
        return this;
    }

    use(player, world) {
        return false;
    }
}
