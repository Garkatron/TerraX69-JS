import Object2D from "../../base_stuff/Object2D";
import Tile from "./Tile";

export default class Tilemap2D extends Object2D {
    constructor(map, imageResources, tile_size) {
        super(0, 0);
        this.imageResources = imageResources;
        this.TILE_SIZE = tile_size;

        this.tiles = map;
        this.textures = this._loadAtlas(imageResources);
        this._process_map(map);
    }

    _loadAtlas(imageResources) {
        const atlas = {};
        for (const [key, value] of Object.entries(imageResources)) {
            atlas[key] = new Tile(value); 
        }
        return atlas;
    }

    _process_map(map) {
        if (!map) {
            console.warn("Map undefined");
            return;
        }

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                let tile = map[y][x];
                let type = tile;
                if (tile && this.textures[type]) {
                    const texture = this.textures[type];
                    map[y][x] = texture;
                }
            }
        }
    }

    draw() {
        if (!this.tiles) {
            console.warn("Map undefined");
            return;
        }

        this.tiles.forEach((row, y) => {
            row.forEach((tile, x) => {
                tile.x = x * this.TILE_SIZE - this.x;
                tile.y = y * this.TILE_SIZE - this.y;
                tile.draw();
            });
        });
    }

    setTile(x, y, type) {
        this.tiles[y][x] = this.textures[type].setX(x).setY(y);
    }

    getTile(x, y) {
        return this.tiles[y]?.[x] || null;
    }

    getTileId(x, y) {
        return this.tiles[y]?.[x].id || null;
    }

    getTileMetaData(x, y) {
        let tile = this.getTile(x, y);
        return tile?.metaData || null;
    }

    setTileMetaData(x, y, metaData) {
        let tile = this.getTile(x, y);
        if (tile) {
            tile.metaData = metaData;
        }
    }

    deleteTileMetaData(x, y) {
        let tile = this.getTile(x, y);
        if (tile) {
            tile.metaData = null;
        }
    }

   
    
}
