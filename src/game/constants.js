import { ITEM_STONE } from "./items/items";

export const TILE_SIZE = 32;
export const CHUNK_SIZE = 16;

export const PLAYER = "PLAYER";
export const WATER = "WATER";
export const GRASS = "GRASS";
export const LONG_GRASS = "LONG_GRASS";
export const SHORT_GRASS = "SHORT_GRASS";
export const DIRTH = "DIRTH";
export const MOUNTAIN = "MOUNTAIN";
export const CAVE = "CAVE";
export const STONE = "STONE";
export const STONE_FLOOR = "STONE_FLOOR";
export const CITY = "CITY";
export const TREE = "TREE";
export const BUSH = "BUSH";

export const DIRECTION = {
    NORTH: "NORTH",
    SOUTH: "SOUTH",
    EAST: "EAST",
    WEST: "WEST",
}

export const ARROW = {
    NORTH: "ARROW_UP",
    SOUTH: "ARROW_DOWN",
    EAST: "ARROW_RIGHT",
    WEST: "ARROW_LEFT",
};


export const OVERWORLD = (value) => {

    const round = Math.round(value*100);
    
    if (round < 20) {
        return WATER;
    
    } else if (round < 30) {
        return DIRTH;
    
    } else if (round < 40) {
        return MOUNTAIN;
    
    } else if (round < 50) {
        return LONG_GRASS;
    
    } else if (round < 55) {
        return GRASS;
    
    } else if (round < 60) {
        return SHORT_GRASS;

    } else if (round < 70) {
        return WATER;

    } else if (round < 80) {
        return STONE;
    }
    return GRASS
    
    
}
export const CAVE_WORLD = (value) => {
    const round = Math.round(value*100);

    if (round < 20) {
        return WATER;
    
    } else if (round < 30) {
        return STONE_FLOOR;
    
    } else if (round < 40) {
        return MOUNTAIN;
    
    } else if (round < 50) {
        return STONE_FLOOR;
    
    } else if (round < 55) {
        return STONE;
    
    } else if (round < 60) {
        return SHORT_GRASS;

    } else if (round < 700) {
        return WATER;
    }
}

export const OBSTACLE = [
    WATER,
    MOUNTAIN,
]

export const CITY_OBSTACLE = [
    WATER,
    MOUNTAIN,
    MOUNTAIN,
    CAVE
]

export const TREE_OBSTACLE = [
    WATER,
    MOUNTAIN,
    CAVE,
    MOUNTAIN,
    CITY
]

export const BUSH_OBSTACLE = [
    WATER,
    MOUNTAIN,
    MOUNTAIN,
    CAVE,
    CITY,
    TREE
]

export const DESTROYABLE = [
    MOUNTAIN
]
export const DESTROYABLE_LOOT = {
    "MOUNTAIN": ITEM_STONE
}