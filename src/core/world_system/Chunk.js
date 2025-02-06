import TileObject from "../../game/object_system/TileObject.js";
import MetaData from "../data_management/MetaData.js";
import Tilemap2D from './../texture_system/tilemap_system/Tilemap2D';
export default class Chunk extends TileObject {
    constructor(x, y, id, size, world, map = null, tile_size, resourceList = {}) {
        super(world, id, "chunk");
        this.size = size;
        this.TILE_SIZE = tile_size;
        this.x = x;
        this.y = y;

        this.tilemap = new Tilemap2D(map, resourceList, tile_size);
        
        this.metadata = new MetaData();
    }

    draw() {
        this.tilemap.x = -this.x*this.TILE_SIZE*this.size
        this.tilemap.y = -this.y*this.TILE_SIZE*this.size
        this.tilemap.draw();
    }

    genStuff(numberOfStuff, rng, obj, id, filterList) {
        let allCoords = this._findStuffCoords(filterList);

        if (!allCoords || allCoords.length === 0) {
            console.warn("No se encontraron coordenadas válidas en este chunk.");
            return;
        }

        this._shuffleArray(allCoords, rng);

        for (let stuffIndex = 0; stuffIndex < Math.min(numberOfStuff, allCoords.length); stuffIndex++) {
            const coords = allCoords[stuffIndex];
            const stuffX = (this.x * this.size) + coords[0];
            const stuffY = (this.y * this.size) + coords[1];

            this.world.addObject(new obj(this.world, stuffIndex, id).setX(stuffX).setY(stuffY));
            this.tilemap.setTile(coords[0], coords[1], id); // Usamos el método setTile de Tilemap2D
        }
    }

    _findStuffCoords(filterList) {
        let validCoords = [];

        for (let localY = 0; localY < this.size; localY++) {
            for (let localX = 0; localX < this.size; localX++) {
                if (!filterList.includes(this.tilemap.getTile(localX, localY))) {
                    validCoords.push([localX, localY]);
                }
            }
        }

        return validCoords.length > 0 ? validCoords : null;
    }

    _shuffleArray(array, chunkRng) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(chunkRng() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    update() {
        // Aquí podrías añadir actualizaciones específicas si es necesario.
    }

    isValidTile(x, y) {
        return x >= 0 && x < this.size && y >= 0 && y < this.size;
    }

    putTile(x, y, id) {
        if (this.isValidTile(x, y)) {
            this.tilemap.setTile(x, y, id); // Usamos el método setTile de Tilemap2D
            return true;
        } else {
            console.warn(`Tile (${x}, ${y}) is out of bounds.`);
            return false;
        }
    }

    getTile(x, y) {
        if (this.isValidTile(x, y)) {
            return this.tilemap.getTile(x, y); // Usamos el método getTile de Tilemap2D
        }
        console.warn(`Tile (${x}, ${y}) is out of bounds.`);
        return null;
    }

    getTileId(x, y) {
        if (this.isValidTile(x, y)) {
            return this.tilemap.getTileId(x, y); // Usamos el método getTile de Tilemap2D
        }
        console.warn(`Tile (${x}, ${y}) is out of bounds.`);
        return null;
    }

    modifyTile(x, y, id) {
        let r = this.putTile(x, y, id);
        if (!r) return false;
        this.world.mapChanges[`CHUNK:${this.id}`] = { "tile": id, "at": { "x": x, "y": y } };
        return true;
    }
}
