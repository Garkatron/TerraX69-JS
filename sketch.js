import p5 from 'p5';
import Engine from './src/core/Engine';
import Global from './src/game/Global';
import Hud from './src/game/gui/Hud';
import ImageResource from './src/core/resource_system/resources/ImageResource';
import { TILE_SIZE } from './src/game/constants';
import SceneManager from './src/core/scene_system/SceneManager';
import WorldScene from './src/game/scenes/WorldScene';
import TestScene from './src/game/scenes/TestScene';
import StartMenu from './src/game/gui/start/StartMenu';
import FontResource from './src/core/resource_system/resources/FontResource';

let sceneManager = null;
const engine = new Engine(p5);
const global = new Global();
const hud = new Hud();

engine.preload((p) => {
  global.setResources({
    ARROW_LEFT: new ImageResource("ARROW_LEFT", p.loadImage(require("/assets/textures/ui/arrow_left.png")), TILE_SIZE, TILE_SIZE),
    ARROW_RIGHT: new ImageResource("ARROW_RIGHT", p.loadImage(require("/assets/textures/ui/arrow_right.png")), TILE_SIZE, TILE_SIZE),
    ARROW_UP: new ImageResource("ARROW_UP", p.loadImage(require("/assets/textures/ui/arrow_up.png")), TILE_SIZE, TILE_SIZE),
    ARROW_DOWN: new ImageResource("ARROW_DOWN", p.loadImage(require("/assets/textures/ui/arrow_down.png")), TILE_SIZE, TILE_SIZE),
    PLAYER: new ImageResource("PLAYER", p.loadImage(require("/assets/textures/world/player.png")), TILE_SIZE, TILE_SIZE),
    WATER: new ImageResource("WATER", p.loadImage(require("/assets/textures/world/water.png")), TILE_SIZE, TILE_SIZE),
    GRASS: new ImageResource("GRASS", p.loadImage(require("/assets/textures/world/grass.png")), TILE_SIZE, TILE_SIZE),
    BUSH: new ImageResource("BUSH", p.loadImage(require("/assets/textures/world/bush.png")), TILE_SIZE, TILE_SIZE),
    TREE: new ImageResource("TREE", p.loadImage(require("/assets/textures/world/tree00.png")), TILE_SIZE, TILE_SIZE),
    EDGE_DOWN_GRASS: new ImageResource("EDGE_DOWN_GRASS", p.loadImage(require("/assets/textures/world/edge_down_grass.png")), TILE_SIZE, TILE_SIZE),
    DIRTH: new ImageResource("DIRTH", p.loadImage(require("/assets/textures/world/dirth.png")), TILE_SIZE, TILE_SIZE),
    MOUNTAIN: new ImageResource("MOUNTAIN", p.loadImage(require("/assets/textures/world/stone.png")), TILE_SIZE, TILE_SIZE),
    CAVE: new ImageResource("CAVE", p.loadImage(require("/assets/textures/world/cave.png")), TILE_SIZE, TILE_SIZE),
    STONE: new ImageResource("STONE", p.loadImage(require("/assets/textures/world/pebble.png")), TILE_SIZE, TILE_SIZE),
    CITY: new ImageResource("CITY", p.loadImage(require("/assets/textures/world/city.png")), TILE_SIZE, TILE_SIZE),
    LONG_GRASS: new ImageResource("LONG_GRASS", p.loadImage(require("/assets/textures/world/long_grass.png")), TILE_SIZE, TILE_SIZE),
    SHORT_GRASS: new ImageResource("SHORT_GRASS", p.loadImage(require("/assets/textures/world/short_grass.png")), TILE_SIZE, TILE_SIZE),
    STONE_FLOOR: new ImageResource("STONE_FLOOR", p.loadImage(require("/assets/textures/world/stone_floor.png")), TILE_SIZE, TILE_SIZE),
    "ITEM.GUN.A": new ImageResource("ItemGunATexture", p.loadImage(require("/assets/textures/weapons/gun.png")), TILE_SIZE, TILE_SIZE),
    "ITEM.TOOL.PICKAXE": new ImageResource("ItemToolPickaxe", p.loadImage(require("/assets/textures/tools/pickaxe.png")), TILE_SIZE, TILE_SIZE),
    "ITEM.STONE": new ImageResource("ItemStoneTexture", p.loadImage(require("/assets/textures/world/pebble.png")), TILE_SIZE, TILE_SIZE),
  });
});

engine.setup((p) => {
  p.createCanvas(window.innerWidth, window.innerHeight);
  p.textFont("ModerDOS");

  const scenes = {
    world: new TestScene(),
    start_menu: new StartMenu()
    //world: new WorldScene()
  };

  sceneManager = new SceneManager("world", scenes);
  global.sceneManager = sceneManager;
  sceneManager.changeScene("world");
  hud.setup();
});

engine.draw((p) => {
  p.background("black");

  sceneManager.update();
  sceneManager.draw();
  hud.update();
  hud.draw();
});