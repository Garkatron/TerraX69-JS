import Global from "../../Global";
import TileObject from "../TileObject";
import Sprite2D from './../../../core/texture_system/Sprite2D';
import { TILE_SIZE } from './../../constants';

export default class CaveEntranceObject extends TileObject {
    constructor(world, id, textureId) {
        super(world, id, "CaveEntrance", textureId);
    }
}