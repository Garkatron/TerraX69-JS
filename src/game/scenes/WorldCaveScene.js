import Scene from './../../core/scene_system/Scene';

export default class WorldCaveScene extends Scene {

    constructor() {
        super();
        this.world = null;
        this.global = new Global();
        this.rng = {
            "minCavesPerChunk": 1,
            "maxCavesPerChunk": 1,
            "caveProb": 0.6,
        };
    }

    setup() {

        this.world = new World(this.p, 16, 16, "gabs", Chunk);
        this.world.generateWorld(CAVE_WORLD);
        
        //this.world.generateStuff(this.rng["minCavesPerChunk"], this.rng["maxCavesPerChunk"], this.rng["caveProb"], CaveEntranceObject, CAVE, OBSTACLE);
        for (const obj of this.global.overworld.objects) {
            if (obj instanceof CaveEntranceObject) {
                let obj2 = obj;
                obj2.x -= TILE_SIZE;
                this.world.addObject(obj2);
            }
        }

        this.world.addEntity(this.global.player);
      
    }

    draw() {
        this.world.draw();
    }
    
    update() {
        this.world.update();
        
    }
}