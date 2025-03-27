import Vector2 from './../../math/Vector2';
import Tilemap2D from './Tilemap2D';

export default class DualTilemap2D extends Tilemap2D {
    constructor(technical_map, imageResources, tile_size, neighbours_to_atlas_coords={}) {
        super([], imageResources, tile_size);

        this.technical_map = technical_map;
        this.tiles = [];

        this.neighbours_to_atlas_coords = neighbours_to_atlas_coords;
        for (let y = 0; y < this.technical_map.length; y++) {
            let row = [];
            let cell = [];
            for (let x = 0; x < this.technical_map[y].length; x++) {
                cell.push(this.technical_map[y][x]); 
        
                if (x % 4 == 3)  {
                    row.push(this.neighbours_to_atlas_coords[cell.join(":")]);                    
                    cell = [];
                }       
            }
            
            
            this.tiles.push(row);
        }
        
        
        this.NEIGHBOURS = [
            new Vector2(0, 0),
            new Vector2(1, 0),
            new Vector2(0, 1),
            new Vector2(1, 1)
        ];


        this._process_map(this.tiles);
    }


    isWithinBounds(pos) {
        return pos.x >= 0 && pos.y >= 0 && pos.y < this.technical_map.length && pos.x < this.technical_map[pos.y].length;
    }

    setDisplayTile(pos = new Vector2(0, 0)) {        

        for (let i = 0; i < this.NEIGHBOURS.length; i++) {
            let newPos = pos.add(this.NEIGHBOURS[i]);            
            if (this.isWithinBounds(newPos)) {
                
                this.tiles[newPos.y][newPos.x] = this.calculateDisplayTile(newPos);
            }
        }
    }

    calculateDisplayTile(coords = new Vector2(0, 0)) {
        let botRight = this.isWithinBounds(coords.subtract(this.NEIGHBOURS[0])) ? this.getWorldTile(coords.subtract(this.NEIGHBOURS[0])) : "GRASS";
        let botLeft = this.isWithinBounds(coords.subtract(this.NEIGHBOURS[1])) ? this.getWorldTile(coords.subtract(this.NEIGHBOURS[1])) : "GRASS";
        let topRight = this.isWithinBounds(coords.subtract(this.NEIGHBOURS[2])) ? this.getWorldTile(coords.subtract(this.NEIGHBOURS[2])) : "GRASS";
        let topLeft = this.isWithinBounds(coords.subtract(this.NEIGHBOURS[3])) ? this.getWorldTile(coords.subtract(this.NEIGHBOURS[3])) : "GRASS";
                
        return this.neighbours_to_atlas_coords[`${topLeft}:${topRight}:${botLeft}:${botRight}`] || "NULL";
    }

    getWorldTile(coords) {
        if (this.isWithinBounds(coords)) {            
            return this.technical_map[coords.y][coords.x];
        } 
        return "NULL";
    }
}