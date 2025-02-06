import seedRandom from "seedrandom";
import MetaData from "../data_management/MetaData.js";
import EngineGlobal from "../EngineGlobal.js";

export default class World {
    constructor(width, height, seed = "d...s-", chunkClass = null, chunkSize = 16,  filledWith,  tile_size, resourceList) {
        this.p = new EngineGlobal().p5;
        this.resourceList = resourceList;
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.chunkClass = chunkClass;
        this.metadata = new MetaData();
        this.chunkSize = chunkSize;
        this.TILE_SIZE = tile_size;
        this.DEFAULT_FILL = filledWith;
        this.mapChanges = [];
        
        this.seedValue = seed;
        this.seed = seedRandom.xor4096(this.seedValue);
        
        console.log(this.seed());
        
        this.chunkIDs = 0;
        this.chunks = [];
       
        this.objects = [];
        this.entities = [];
       
        this.noiseScale = 0.05;

    }

    generateStuff(min, max, prob, obj, id, filterList) {
        if (min <= 0) { min = 1; }
        if (max <= 0) { max = 1; }
        if (max < min) { max = min; }

        for (let index = 0; index < this.chunks.length; index++) {
            const chunk = this.chunks[index];

            const chunkRandom = seedRandom(`${this.seed()}-${chunk.x}-${chunk.y}`);
            const randomValue = chunkRandom();
            
            const numberOfStuff = Math.floor(randomValue * (max - min + 1)) + min;
            
            if (randomValue < prob) {
                chunk.genStuff(numberOfStuff, chunkRandom, obj, id, filterList);
            }
        }
    }

    checkCollision(object, ...objects) {
        return objects.find(obj => obj.x === object.x && obj.y === object.y) || null;
    }
    
    
    getChunkAt(x, y) {
        return this.chunks.find(chunk => {
            const startX = chunk.x * chunk.size * this.TILE_SIZE;
            const startY = chunk.y * chunk.size * this.TILE_SIZE;
            const endX = startX + chunk.size * this.TILE_SIZE;
            const endY = startY + chunk.size * this.TILE_SIZE;

            return x * this.TILE_SIZE >= startX && x * this.TILE_SIZE < endX && y * this.TILE_SIZE >= startY && y * this.TILE_SIZE < endY;
        }) || null;
    }


    draw() {
        this.chunks.forEach(chunk => chunk.draw());
        this.objects.forEach(object => object.draw());
        this.entities.forEach(entity => entity.draw());
    }

    update() {
        for (const entity of this.entities) {
            const collidedObject = this.checkCollision(entity, ...this.objects);            
            if (collidedObject) {
                entity.handleCollision(collidedObject);
            }
        }
        

        this.chunks.forEach(chunk => chunk.update());
        this.objects.forEach(obj => obj.update());
        this.entities.forEach(entity => entity.update());
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    addObject(obj) {
        this.objects.push(obj);
    }

    removeObject(object) {
        const index = this.objects.indexOf(object);
        if (index !== -1) {
            this.objects.splice(index, 1); 
        } else {
            console.warn("Object not found in the list.");
        }
    }
    

    removeEntity(entity) {
        const index = this.objects.indexOf(entity);
        if (index !== -1) {
            this.objects.splice(index, 1); 
        } else {
            console.warn("Entity not found in the list.");
        }
    }

    generateWorld(tileParams) {
        const chunksInRow = this.width;
        const chunksInCol = this.height;
        this.p.noiseSeed(this.seed() * 999999);
    
        for (let chunkY = 0; chunkY < chunksInCol; chunkY++) {
            for (let chunkX = 0; chunkX < chunksInRow; chunkX++) {
                let chunkMap = [];
    
                for (let y = 0; y < this.chunkSize; y++) {
                    let row = [];
                    let globalY = chunkY * this.chunkSize + y;
    
                    for (let x = 0; x < this.chunkSize; x++) {
                        let globalX = chunkX * this.chunkSize + x;
    
                        // Verificar límites del mundo
                        if (globalX >= this.worldWidth || globalY >= this.worldHeight) {
                            row.push(0);
                            continue;
                        }
    
                        let nx = globalX * this.noiseScale;
                        let ny = globalY * this.noiseScale;
                        let noiseValue = this.p.noise(nx, ny);
    
                        let tileValue = tileParams(noiseValue);
                        row.push(tileValue);
                    }
    
                    chunkMap.push(row);
                }
                    
                const chunk = new this.chunkClass(
                    chunkX, 
                    chunkY, 
                    this.chunkIDs++, 
                    this.chunkSize, 
                    this, 
                    chunkMap,
                    this.TILE_SIZE,
                    this.resourceList
                );
                this.chunks.push(chunk);
            }
        }
    }
    
}
