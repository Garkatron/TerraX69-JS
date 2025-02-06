import Scene from "../../core/scene_system/Scene";
import SceneManager from "../../core/scene_system/SceneManager";
import Global from "../Global";
import VBox from "../../core/gui_system/container/VBox";
import Inv from "./Inv";
import Text from "../../core/gui_system/info/Text";
import GObject from "../../core/gui_system/GObject";
import Button from "../../core/gui_system/interaction/Button";
import { TILE_SIZE } from "../constants";

export default class Hud extends Scene {
    constructor() {
        super();
        this.global = new Global();
        this.sceneManager = null;
        this.startTime = 0;
        this.invButton = null;
    }

    setup() {
        this.initializeSceneManager();
        this.initializeHudElements();
        this.startTime = this.p.millis();
    }

    initializeSceneManager() {
        this.sceneManager = new SceneManager("inv", {
            "inv": new Inv(),
        });
        
        this.sceneManager.active = false;
    }

    initializeHudElements() {
        this.box = new VBox(this.p, 200, 200);
        this.box.addContent(
            new Text(this.p, "Name: ?").setId("name"),
            new Text(this.p, "Life: 100").setId("life"),
            new Text(this.p, "Time: 0").setId("time"),
            new GObject(this.p, 0, 20).setId("spacer"),
            new Text(this.p, "Coords: 0x0").setId("coords"),
            new Button(this.p, "Inventory", 200, 20).setOnClick(() => {
                this.toggleInventory();
            })
        );
    }

    toggleInventory() {
        this.sceneManager.active = !this.sceneManager.active;
        this.sceneManager.changeScene("inv");
    }

    update() {
        this.sceneManager.update();
        this.updateHudPosition();
    }

    updateHudPosition() {
        this.box.x = 10;
        this.box.y = 0;
    }

    draw() {
        this.showInfoHud();
        this.sceneManager.draw();
    }

    showInfoHud() {
        let pastTime = Math.round((this.p.millis() - this.startTime) / 1000);
        this.updateHudValues(pastTime);
        this.box.draw();
    }

    updateHudValues(pastTime) {
        this.box.getById("name").setText("Name: " + this.global.player.name);
        this.box.getById("life").setText("Life: " + this.global.player.life);
        this.box.getById("time").setText("Time: " + pastTime + "s");
        this.box.getById("coords").setText(`Coords: ${this.global.player.x}x${this.global.player.y}`);
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
