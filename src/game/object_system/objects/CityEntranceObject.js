import Sprite2D from "../../../core/texture_system/Sprite2D";
import { TILE_SIZE } from "../../constants";
import Global from "../../Global";
import TileObject from "../TileObject";

export default class CityEntranceObject extends TileObject {
    constructor(world, id, textureId) {
        super(world, id, "CityEntrance", textureId);
        
    }


}