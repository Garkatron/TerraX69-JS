export default class MetaData {

    constructor() {
        this.metadata = {}
    }

    hasMeta(key) {
        return key in this.metadata;
    }

    setMetadata(key, value) {
        this.metadata[key] = value;
    }
    
    getMetadata(key) {
        return this.metadata[key] ?? null;
    }
    
    removeMetadata(key) {
        delete this.metadata[key];
    }
    
}