import Scene from "../../core/scene_system/Scene";
import Global from './../Global';
import ItemStackObject from './../object_system/objects/ItemStackObject';
import ItemStack from './../../core/item_system/ItemStack';
import { ITEM_GUN_A, ITEM_TOOL_PICKAXE } from './../../game/items/items';
import Player from './../entity_system/entities/Player';
import CityEntranceObject from './../object_system/objects/CityEntranceObject';
import World from './../../core/world_system/World';
import Camera from './../../core/rendering_stuff/Camera';
import Chunk from "../../core/world_system/Chunk";
import { CAVE, CHUNK_SIZE, CITY, CITY_OBSTACLE, GRASS, OBSTACLE, OVERWORLD, PLAYER, TILE_SIZE } from "../constants";
import { ITEM_GUN_A } from './../items/items';
import { onMouseReleased, onMousePressed, onMouseWheelDown, onMouseWheelUp } from '../../core/Engine';
import CaveEntranceObject from "../object_system/objects/CaveEntranceObject";

export default class WorldScene extends Scene {

    constructor() {
        super();
        this.world = null;
        this.global = new Global();
        this.rng = {
            "minCavesPerChunk": 1,
            "maxCavesPerChunk": 1,
            "caveProb": 0.6,
            "minCitiesPerChunk": 1,
            "maxCitiesPerChunk": 1,
            "cityProb": 0.6,
        };
        this.camera = null;

    }

    setup() {
        this.camera = new Camera(1, 0, 0);
        this.world = new World(8, 8, "gabs", Chunk, CHUNK_SIZE, GRASS, TILE_SIZE, this.global.resourceList);
        this.world.generateWorld(OVERWORLD);
        
        this.world.generateStuff(this.rng["minCavesPerChunk"], this.rng["maxCavesPerChunk"], this.rng["caveProb"], CaveEntranceObject, CAVE, OBSTACLE);
        
        this.world.generateStuff(this.rng["minCitiesPerChunk"], this.rng["maxCitiesPerChunk"], this.rng["cityProb"], CityEntranceObject, CITY, CITY_OBSTACLE);
        
        this.world.addObject(new ItemStackObject(this.world, new ItemStack(ITEM_TOOL_PICKAXE, 10), 0).setX(1).setY(1));
        
        if (this.global.player==null) {
            this.global.player = new Player(this.world, PLAYER, "Player");
            
        }
        this.global.player.setWorld(this.world);
        this.world.addEntity(this.global.player);
        this.global.overworld = this.world;
        
        onMousePressed.connect(()=>{
            this.camera.startDrag();
        })
        onMouseReleased.connect(()=>{
            this.camera.stopDrag();
        })

        onMouseWheelUp.connect(()=>{
            this.camera.zoom += 0.1;
        });
        
        onMouseWheelDown.connect(()=>{
            if (this.camera.zoom > 0.2) {
                this.camera.zoom -= 0.1;                
            }
        });
   
        
    }

    draw() {
        this.camera.draw(
            () => {
                this.world.draw();
            }
        )
    }

    update() {
        this.camera.update();
        this.world.update();
    }
}