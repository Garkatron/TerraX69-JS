
import Scene from './../../core/scene_system/Scene';
import ItemStackGrid from './../../core/gui_system/container/ItemStackGrid';
import Global from '../Global';
export default class Inv extends Scene {
    constructor() {
        super();
        this.box = null;
        this.topX = 0;
        this.topY = 0;
        this.global = null;
    }

    setup() {
        this.global = new Global();
        this.box = new ItemStackGrid(this.p, 200, 600, this.global.player, this.global.resourceList, (itemStack, x , y, fi)=>{
            this.global.player.hudSelectItemSignal.emit(fi);
        });
        this.box.addContent(this.global.player.inventory.getAsArray2D(20))

    }

    update() {
        this.box.x = 10
        this.box.y = 200;
    }

    draw() {
        this.box.draw();
    }
}