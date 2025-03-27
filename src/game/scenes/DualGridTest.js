import Scene from "../../core/scene_system/Scene";
import { TILE_SIZE } from "../constants";
import Global from "../Global";
import DualTilemap2D from './../../core/texture_system/tilemap_system/DualTilemap2D';

export default class DualGridTest extends Scene {
    constructor() {
        super();
        this.global = new Global();
        this.tilemap = null;
    }
    
    setup() {
        
        this.tilemap = new DualTilemap2D([
            [
                "GRASS","GRASS", 
                "GRASS","WATER", 
                
                "GRASS","GRASS", 
                "WATER","WATER", 
                
                "GRASS","GRASS", 
                "WATER","GRASS",
            ],
            [
                "GRASS","WATER", 
                "GRASS","WATER", 
                
                "GRASS","GRASS", 
                "GRASS","GRASS", 
                
                "WATER","GRASS", 
                "WATER","GRASS",
            ],
            [
                "GRASS","WATER", 
                "GRASS","GRASS", 
                
                "WATER","WATER", 
                "GRASS","GRASS", 
                
                "WATER","GRASS", 
                "GRASS","GRASS",
            ],
            
        ], this.global.resourceList, TILE_SIZE,
        {
            "GRASS:GRASS:GRASS:GRASS": "GRASS_08",
            "GRASS:GRASS:WATER:WATER": "GRASS_02",
            "GRASS:GRASS:GRASS:WATER": "GRASS_01",
            "GRASS:WATER:WATER:GRASS": "GRASS_20",
            "WATER:WATER:WATER:GRASS": "GRASS_15",
            "WATER:WATER:GRASS:WATER": "GRASS_03",
            "WATER:GRASS:WATER:WATER": "GRASS_04",
            "GRASS:WATER:WATER:WATER": "GRASS_06",
            "WATER:GRASS:WATER:GRASS": "GRASS_09",
            "GRASS:WATER:GRASS:WATER": "GRASS_07",
            "WATER:WATER:GRASS:GRASS": "GRASS_14",
            "WATER:GRASS:GRASS:GRASS": "GRASS_15",
            "GRASS:WATER:GRASS:GRASS": "GRASS_13",
            "GRASS:GRASS:WATER:GRASS": "GRASS_03",
            "WATER:GRASS:GRASS:WATER": "GRASS_19",
            "WATER:WATER:WATER:WATER": "WATER"
        });
    }

    draw() {
        this.tilemap.draw();
    }

    update() {
    }
}