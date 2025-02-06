export default class Resource {
    constructor(name = "Default") {
        this.name = name;
    }

    loadData(data) {
        Object.assign(this, data);
    }

    serialize() {
        return JSON.stringify(this);
    }

    deserialize(json) {
        try {
            const parsed = JSON.parse(json);
            Object.assign(this, parsed);
        } catch (error) {
            console.error("[ERROR] at deserialize data:", error);
        }
    }

    clone() {
        const newResource = new Resource(this.name);
        Object.assign(newResource, this);
        return newResource;
    }
}
