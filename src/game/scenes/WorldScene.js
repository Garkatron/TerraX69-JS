// ** Core System **
import Scene from "../../core/scene_system/Scene";
import World from "../../core/world_system/World";
import Chunk from "../../core/world_system/Chunk";
import Camera from "../../core/rendering_stuff/Camera";
import ShiftManager from "../shift_system/ShiftManager";

// ** Constants **
import { 
    BUSH,
    BUSH_OBSTACLE,
    CAVE, CHUNK_SIZE, CITY, CITY_OBSTACLE, CSFLOWER, CSFLOWER_OBSTACLE, GRASS, OBSTACLE, 
    OVERWORLD, PLAYER, TILE_SIZE 
} from "../constants";

// ** Game Items **
import {ITEM_DOG_ATTACK, ITEM_TOOL_PICKAXE, ITEM_WEAPON_GUN_A } from "../../game/items/items";

// ** Entity System **
import Player from "../entity_system/entities/Player";
import Enemy from "../entity_system/entities/Enemy";

// ** Object System **
import ItemStackObject from "../object_system/objects/ItemStackObject";
import CityEntranceObject from "../object_system/objects/CityEntranceObject";
import CaveEntranceObject from "../object_system/objects/CaveEntranceObject";

// ** Item System **
import ItemStack from "../../core/item_system/ItemStack";

// ** Event Handlers **
import { onMouseReleased, onMousePressed, onMouseWheelDown, onMouseWheelUp } from "../../core/Engine";

// ** Global Variables **
import Global from "../Global";
import Robot from "../entity_system/entities/Robot";
import Bush from './../object_system/objects/Bush';
import Hud from "../gui/Hud";
import CSFlower from './../object_system/objects/CSFlower';
import Pet from "../entity_system/entities/Pet";
import { ITEM_FISH_ATTACK } from './../items/items';

export default class WorldScene extends Scene {

    constructor() {
        super();
        this.world = null;
        this.global = new Global();
        this.rng = {
            "minBushPerChunk": 1,
            "maxBushPerChunk": 1,
            "bushProb": 0.6,
            "minCavesPerChunk": 1,
            "maxCavesPerChunk": 1,
            "caveProb": 0.6,
            "minCitiesPerChunk": 1,
            "maxCitiesPerChunk": 1,
            "cityProb": 0.6,
            "minCSFlowerPerChunk": 1,
            "maxCSFlowerPerChunk": 2,
            "csflowerProb": 0.5,
        };
        this.camera = null;
        this.shiftManager = null;
        this.hud = null;
    }

    setup() {
        // ** Setting Up Camera **
        this.camera = new Camera(1, 0, 0);
        this.global.camera = this.camera;
        // this.global.turntable.playRandomSong();
        

        // ** Shift Manager **
        this.shiftManager = new ShiftManager();
        
        // ** Setting Up the World **
        this.world = new World(8, 8, "ss2356", Chunk, CHUNK_SIZE, GRASS, TILE_SIZE, this.global.resourceList);
        this.world.generateWorld(OVERWORLD);
        
        this.world.generateStuff(this.rng["minCavesPerChunk"], this.rng["maxCavesPerChunk"], this.rng["caveProb"], CaveEntranceObject, CAVE, OBSTACLE);
        
        this.world.generateStuff(this.rng["minCitiesPerChunk"], this.rng["maxCitiesPerChunk"], this.rng["cityProb"], CityEntranceObject, CITY, CITY_OBSTACLE);
        this.world.generateStuff(this.rng["minBushPerChunk"], this.rng["maxBushPerChunk"], this.rng["bushProb"], Bush, BUSH, BUSH_OBSTACLE);
        this.world.generateStuff(this.rng["minCSFlowerPerChunk"], this.rng["maxCSFlowerPerChunk"], this.rng["csflowerProb"], CSFlower, CSFLOWER, CSFLOWER_OBSTACLE);
        

        this.world.addObject(new ItemStackObject(this.world, new ItemStack(ITEM_TOOL_PICKAXE, 10), 0).setX(1).setY(1));
        this.world.addObject(new ItemStackObject(this.world, new ItemStack(ITEM_WEAPON_GUN_A, 10), 0).setX(6).setY(1));
        
        // ** Setting Up Player **
        if (this.global.player == null) {
            this.global.player = new Player(this.world, PLAYER, "Player", this.shiftManager);
        }
        
        this.global.player.onDie.connect(
            () => {
                this.global.sceneManager.changeScene("start");
            }
        )
        
        this.shiftManager.requestShift(this.global.player, 1);
     
        this.global.player.inventory.addItemStack(new ItemStack(ITEM_TOOL_PICKAXE, 10));
        this.global.player.setWorld(this.world);
        
        this.hud = new Hud();
        this.hud.setup();

        // ** Adding Entities **
        this.world.addEntities(
            this.global.player,
            new Robot(this.world, "MUSCLE_BOT", "Enemy1", this.shiftManager).setX(20),
            new Robot(this.world, "MUSCLE_BOT", "Enemy2", this.shiftManager).setX(15),
            new Robot(this.world, "MUSCLE_BOT", "Enemy3", this.shiftManager).setX(12),
            new Robot(this.world, "MUSCLE_BOT", "Enemy4", this.shiftManager).setX(23),
           
            new Pet(this.world, "PET_FISH", "FISH", this.shiftManager)
            .modify((instance)=>{
                instance.setX(5).setY(9);
                instance.inventory.addItemStack(new ItemStack(ITEM_FISH_ATTACK, 1))
            }),
            new Pet(this.world, "PET_DOG", "DOG", this.shiftManager)
            .modify((instance)=>{
                instance.setX(6).setY(9)
                instance.inventory.addItemStack(new ItemStack(ITEM_DOG_ATTACK, 1))
            }),
            new Pet(this.world, "PET_RAT", "RAT", this.shiftManager).setX(7).setY(10),
            new Pet(this.world, "PET_CHK", "CHK", this.shiftManager).setX(9).setY(10),
            new Pet(this.world, "PET_SNAIL", "SNAIL", this.shiftManager).setX(11).setY(10)
        );
 
        this.global.overworld = this.world;
        
        // ** Mouse Bindings **
        onMousePressed.connect(() => this.camera.startDrag());
        onMouseReleased.connect(() => this.camera.stopDrag());

        onMouseWheelUp.connect(() => {
            this.camera.zoom += 0.1;
        });

        onMouseWheelDown.connect(() => {
            if (this.camera.zoom > 0.2) {
                this.camera.zoom -= 0.1;
            }
        });
    }

    draw() {
        this.camera.draw(() => this.world.draw());
        this.hud.draw();
    }

    update() {
        this.camera.update();
        this.world.update();
        this.shiftManager.update();
        this.hud.update();
    }
}
