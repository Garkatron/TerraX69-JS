import p5 from "p5";
import Engine from "./src/core/Engine";
import Global from "./src/game/Global";
import Hud from "./src/game/gui/Hud";
import ImageResource from "./src/core/resource_system/resources/ImageResource";
import { TILE_SIZE } from "./src/game/constants";
import SceneManager from "./src/core/scene_system/SceneManager";
import WorldScene from "./src/game/scenes/WorldScene";
import Turntable from "./src/core/sound_system/Turntable";
import { Howl } from 'howler';
import { items } from './src/game/items/items';
import AnimResource from "./src/core/resource_system/resources/AnimResource";
import StartMenu from './src/game/gui/start/StartMenu';

// Elimina la función getAssetPath, ya no es necesaria


let sceneManager = null;
const engine = new Engine(p5);
const global = new Global();

engine.preload((p) => {
  global.setResources({
    GRASS: new ImageResource("GRASS", p.loadImage("./src/assets/textures/world/grass.png"), TILE_SIZE, TILE_SIZE),
    NULL: new ImageResource("NULL", p.loadImage("./src/assets/textures/world/null.png"), TILE_SIZE, TILE_SIZE),

    // ! ALL
    MUSCLE_BOT: new ImageResource("MUSCLE_BOT", p.loadImage("./src/assets/textures/entities/enemies/MuscleBot.png"), TILE_SIZE, TILE_SIZE),
    CYCLOPS_BOT: new ImageResource("CYCLOPS_BOT", p.loadImage("./src/assets/textures/entities/enemies/CyclopsBot.png"), TILE_SIZE, TILE_SIZE),
    PET_DOG: new ImageResource("PET_DOG", p.loadImage("./src/assets/textures/entities/pets/dog.png"), TILE_SIZE, TILE_SIZE),
    PET_RAT: new ImageResource("PET_RAT", p.loadImage("./src/assets/textures/entities/pets/rat.png"), TILE_SIZE, TILE_SIZE),
    PET_CHK: new ImageResource("PET_CHK", p.loadImage("./src/assets/textures/entities/pets/chicken.png"), TILE_SIZE, TILE_SIZE),
    PET_BCHK: new ImageResource("PET_BCHK", p.loadImage("./src/assets/textures/entities/pets/baby_chicken.png"), TILE_SIZE, TILE_SIZE),
    PET_SNAIL: new ImageResource("PET_SNAIL", p.loadImage("./src/assets/textures/entities/pets/snail.png"), TILE_SIZE, TILE_SIZE),
    PET_FISH: new ImageResource("PET_FISH", p.loadImage("./src/assets/textures/entities/pets/fish.png"), TILE_SIZE, TILE_SIZE),

    ARROW_LEFT: new ImageResource("ARROW_LEFT", p.loadImage("./src/assets/textures/ui/arrow_left.png"), TILE_SIZE, TILE_SIZE),
    ARROW_RIGHT: new ImageResource("ARROW_RIGHT", p.loadImage("./src/assets/textures/ui/arrow_right.png"), TILE_SIZE, TILE_SIZE),
    ARROW_UP: new ImageResource("ARROW_UP", p.loadImage("./src/assets/textures/ui/arrow_up.png"), TILE_SIZE, TILE_SIZE),
    ARROW_DOWN: new ImageResource("ARROW_DOWN", p.loadImage("./src/assets/textures/ui/arrow_down.png"), TILE_SIZE, TILE_SIZE),
    PLAYER: new ImageResource("PLAYER", p.loadImage("./src/assets/textures/world/player.png"), TILE_SIZE, TILE_SIZE),
    WATER: new AnimResource("WATER", [
      new ImageResource("WATER", p.loadImage("./src/assets/textures/world/water.png"), TILE_SIZE, TILE_SIZE),
      new ImageResource("WATER2", p.loadImage("./src/assets/textures/world/water2.png"), TILE_SIZE, TILE_SIZE),
      new ImageResource("WATER2", p.loadImage("./src/assets/textures/world/water3.png"), TILE_SIZE, TILE_SIZE),
     
    ], TILE_SIZE, TILE_SIZE),
    BUSH: new ImageResource("BUSH", p.loadImage("./src/assets/textures/world/bush.png"), TILE_SIZE, TILE_SIZE),
    CSFLOWER: new ImageResource("CSFLOWER", p.loadImage("./src/assets/textures/world/csflower.png"), TILE_SIZE, TILE_SIZE),
    TREE: new ImageResource("TREE", p.loadImage("./src/assets/textures/world/tree00.png"), TILE_SIZE, TILE_SIZE),
    EDGE_DOWN_GRASS: new ImageResource("EDGE_DOWN_GRASS", p.loadImage("./src/assets/textures/world/edge_down_grass.png"), TILE_SIZE, TILE_SIZE),
    DIRTH: new ImageResource("DIRTH", p.loadImage("./src/assets/textures/world/dirth.png"), TILE_SIZE, TILE_SIZE),
    MOUNTAIN: new ImageResource("MOUNTAIN", p.loadImage("./src/assets/textures/world/stone.png"), TILE_SIZE, TILE_SIZE),
    CAVE: new ImageResource("CAVE", p.loadImage("./src/assets/textures/world/cave.png"), TILE_SIZE, TILE_SIZE),
    STONE: new ImageResource("STONE", p.loadImage("./src/assets/textures/world/pebble.png"), TILE_SIZE, TILE_SIZE),
    CITY: new ImageResource("CITY", p.loadImage("./src/assets/textures/world/city.png"), TILE_SIZE, TILE_SIZE),
    LONG_GRASS: new ImageResource("LONG_GRASS", p.loadImage("./src/assets/textures/world/long_grass.png"), TILE_SIZE, TILE_SIZE),
    SHORT_GRASS: new ImageResource("SHORT_GRASS", p.loadImage("./src/assets/textures/world/short_grass.png"), TILE_SIZE, TILE_SIZE),
    STONE_FLOOR: new ImageResource("STONE_FLOOR", p.loadImage("./src/assets/textures/world/stone_floor.png"), TILE_SIZE, TILE_SIZE),
    "ITEM.GUN.A": new ImageResource("ItemGunATexture", p.loadImage("./src/assets/textures/weapons/gun.png"), TILE_SIZE, TILE_SIZE),
    "ITEM.TOOL.PICKAXE": new ImageResource("ItemToolPickaxe", p.loadImage("./src/assets/textures/tools/pickaxe.png"), TILE_SIZE, TILE_SIZE),
    "ITEM.STONE": new ImageResource("ItemStoneTexture", p.loadImage("./src/assets/textures/world/pebble.png"), TILE_SIZE, TILE_SIZE),
    
    "ITEM.DOG.ATTACK": new ImageResource("ITEM.DOG.ATTACK", p.loadImage("./src/assets/textures/weapons/gun.png"), TILE_SIZE, TILE_SIZE),
    "ITEM.FISH.ATTACK": new ImageResource("ITEM.FISH.ATTACK", p.loadImage("./src/assets/textures/weapons/gun.png"), TILE_SIZE, TILE_SIZE),
    "ITEM.CHICKEN.ATTACK": new ImageResource("ITEM.CHICKEN.ATTACK", p.loadImage("./src/assets/textures/weapons/gun.png"), TILE_SIZE, TILE_SIZE),
    "ITEM.ROBOT.ATTACK.0": new ImageResource("ITEM.ROBOT.ATTACK.0", p.loadImage("./src/assets/textures/weapons/gun.png"), TILE_SIZE, TILE_SIZE),
    
    "sfx.hurt.robot.0": new Howl({
      src: ['./src/assets/voice/21_orc_damage_2.wav'],
    }),
    "sfx.hurt.robot.1": new Howl({
      src: ['./src/assets/voice/21_orc_damage_3.wav'],
    }),

    "sfx.hurt.robot.2": new Howl({
      src: ['./src/assets/voice/21_orc_damage_1.wav'],
    }),

    "sfx.step.0": new Howl({
      src: ['./src/assets/sfx/GRASS - Walk 1.wav'],
      rate: 0.5,
      volume: 0.1,
    }),
    "sfx.step.1": new Howl({
      src: ['./src/assets/sfx/GRASS - Walk 2.wav'],
      rate: 0.8,
      volume: 0.1,
    }),
    "sfx.step.2": new Howl({
      src: ['./src/assets/sfx/GRASS - Walk 3.wav'],
      rate: 1.0,
      volume: 0.1,
    }),
    "sfx.item.pickup": new Howl({
      src: ['./src/assets/sfx/click2.mp3'],
      volume: 1.5,
      rate: 1.0,

    }),
    "sfx.destroy.stone.0": new Howl({
      src: ['./src/assets/sfx/zing0.mp3'],
      rate: 0.6,
      volume: 0.3,

    }),
    "sfx.destroy.stone.1": new Howl({
      src: ['./src/assets/sfx/zing0.mp3'],
      rate: 0.8,
      volume: 0.3,
    }),
    "sfx.destroy.stone.2": new Howl({
      src: ['./src/assets/sfx/zing0.mp3'],
      rate: 1.0,
      volume: 0.3,

    }),
    "sfx.item.drop.0": new Howl({
      src: ['./src/assets/sfx/drum2.mp3'],
      rate: 0.6,
    }),
    "sfx.item.drop.1": new Howl({
      src: ['./src/assets/sfx/drum2.mp3'],
      rate: 0.8,
    }),
    "sfx.item.drop.2": new Howl({
      src: ['./src/assets/sfx/drum2.mp3'],
      rate: 1.0,
    }),
  });

  global.turntable = new Turntable(
    {
      "Cuddle_Clouds": new Howl({
        src: ['./src/assets/songs/Cuddle Clouds.wav']
      }),
      "Evening_Harmony": new Howl({
        src: ['./src/assets/songs/Evening Harmony.wav']
      }),
      "Floating_Dream": new Howl({
        src: ['./src/assets/songs/Floating Dream.wav']
      }),
      "Gentle_Breeze": new Howl({
        src: ['./src/assets/songs/Gentle Breeze.wav']
      }),
      "Golden_Gleam": new Howl({
        src: ['./src/assets/songs/Golden Gleam.wav']
      }),
      "Polar_Lights": new Howl({
        src: ['./src/assets/songs/Polar Lights.wav']
      }),
      "Wanderers_Tale": new Howl({
        src: ['./src/assets/songs/Wanderers Tale.wav']
      }),
      "Whispering_Woods": new Howl({
        src: ['./src/assets/songs/Whispering Woods.wav']
      }),

    }
  );
});

engine.setup((p) => {
  p.createCanvas(window.innerWidth-20, window.innerHeight-20);
  p.textFont("ModerDOS");

  items.forEach((i)=>{
    i.setup();
  });

  const scenes = {
    world: new WorldScene(),
    start: new StartMenu(),
  };

  sceneManager = new SceneManager("world", scenes);
  global.sceneManager = sceneManager;
});

engine.draw((p) => {
  p.background("black");

  sceneManager.update();
  sceneManager.draw();
});
