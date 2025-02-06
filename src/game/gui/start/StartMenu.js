import Global from '../../Global';
import SceneManager from './../../../core/scene_system/SceneManager';
import VBox from './../../../core/gui_system/container/VBox';
import Text from './../../../core/gui_system/info/Text';
import GObject from '../../../core/gui_system/GObject';
import Button from './../../../core/gui_system/interaction/Button';
import Scene from '../../../core/scene_system/Scene';
import TEXT_ALING from '../../../core/gui_system/info/TextAling';
export default class StartMenu extends Scene {
    constructor() {
        super();
        this.global = new Global();
        this.sceneManager = null;
    }

    setup() {
        this.initializeSceneManager();
        this.initializeHudElements();
    }

    initializeSceneManager() {
        //this.sceneManager = new SceneManager("options", {
        //});
        
        //this.sceneManager.active = false;
    }

    initializeHudElements() {
        this.box = new VBox(this.p, 200, 200);
        this.box.x = (this.p.displayWidth / 10) - (200/2);
        this.box.y = (this.p.displayHeight / 10) - (200/2);

        this.box.addContent(
            new Text(this.p, "TerraX69").setId("title").setAlign(TEXT_ALING.LEFT),
            new Text(this.p, "By @Garkatron").setId("subtitle"),
            new GObject(this.p, 0, 20).setId("spacer"),
            
            new Button(this.p, "[Start]", 200, 20)
            .modifyLabel((l)=>{l.setAlign(TEXT_ALING.LEFT)})
            .setOnClick(() => {}),

            new Button(this.p, "[Options]", 200, 20)
            .modifyLabel((l)=>{l.setAlign(TEXT_ALING.LEFT)})
            .setOnClick(() => {}),
            
            new Button(this.p, "[Exit]", 200, 20)
            .modifyLabel((l)=>{l.setAlign(TEXT_ALING.LEFT)})
            .setOnClick(() => {})
        );
    }

    toggleInventory() {
        this.sceneManager.active = !this.sceneManager.active;
        this.sceneManager.changeScene("inv");
    }

    update() {
        //this.sceneManager.update();
    }
    
    draw() {
        this.box.draw()
        //this.sceneManager.draw();
    }



    createButton(text, w, h, x = 0, y = 0, onPressed) {
        const button = this.p.createButton(text);
        button.size(w, h);
        button.style("background-color", "blue");
        button.style("color", "white");
        button.position(x, y);
        button.mousePressed(onPressed);
        return button;
    }
}
