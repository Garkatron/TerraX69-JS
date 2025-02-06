import Sprite2D from "../../../core/texture_system/Sprite2D";
import Global from "../../Global";
import TileObject from "../TileObject";
import { TILE_SIZE } from "../../constants";

export default class ItemStackObject extends TileObject {
    constructor(world, itemStack, id, ) {
        super(world, id, "ItemStack", itemStack.item.id);

        this.itemStack = itemStack;
    }
}