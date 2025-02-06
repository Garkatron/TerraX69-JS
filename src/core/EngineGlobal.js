
export default class EngineGlobal {
    constructor() {
        if (EngineGlobal.instance) {
            return EngineGlobal.instance;
        }
        EngineGlobal.instance = this;
        this.p5 = null;
    }

    setup(p5) {
        this.p5 = p5;
    }
}
