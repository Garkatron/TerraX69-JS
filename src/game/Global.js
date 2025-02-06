
import MetaData from './../core/data_management/MetaData';
export default class Global {
    constructor() {
      if (Global.instance) {
        return Global.instance;
      }
      Global.instance = this;
      this.player = null;
      this.resourceList = {};
      this.globalMeta = new MetaData();
    
      this.overworld = null;
    }

    addResource(key, resource) {
        this.resourceList[key] = resource;
        return this;
    }

    setResources(resoursces = {}) {
        this.resourceList = resoursces;
        return this;
    }

    getResource(key) {
      if (!key in this.resourceList) throw Error("Resource with key "+ key + " doesn't exists");
      return this.resourceList[key];
    }


  }
  