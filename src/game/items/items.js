
import Item from './../../core/item_system/Item';
import ItemPickaxe from './tools/ItemPickaxe';
import ItemWeapon from './weapons/ItemWeapon';

export const ITEM_WEAPON_GUN_A = new ItemWeapon("ITEM.GUN.A", "A gun", "A fucking gun", 100, 100);
export const ITEM_STONE = new Item("ITEM.STONE", "Stone", "A fucking pebble");
export const ITEM_TOOL_PICKAXE = new ItemPickaxe("ITEM.TOOL.PICKAXE", "PICKAXE", "A test item", 100);

export const ITEM_DOG_ATTACK = new ItemWeapon("ITEM.DOG.ATTACK", "Bite", "...", Infinity, 10);
export const ITEM_FISH_ATTACK = new ItemWeapon("ITEM.FISH.ATTACK", "Splash", "...", Infinity, 12);
export const ITEM_CHICKEN_ATTACK = new ItemWeapon("ITEM.CHICKEN.ATTACK", "Fowl Fury", "...", Infinity, 5);
export const ITEM_ROBOT_ATTACK_0 = new ItemWeapon("ITEM.ROBOT.ATTACK.0", "Robot punch 1", "...", Infinity, 5);


export const items = [
    ITEM_WEAPON_GUN_A,
    ITEM_STONE,
    ITEM_TOOL_PICKAXE,
    ITEM_CHICKEN_ATTACK,
    ITEM_DOG_ATTACK,
    ITEM_FISH_ATTACK,
    ITEM_ROBOT_ATTACK_0
];