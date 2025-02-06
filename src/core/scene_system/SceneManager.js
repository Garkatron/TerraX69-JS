import EngineGlobal from "../EngineGlobal";

export default class SceneManager {
    constructor(currentSceneId = "default", scenes = {}) {
        if (!scenes || typeof scenes !== 'object') {
            throw new Error('[SCENE-MANAGER] Scenes must be an object');
        }

        if (!scenes[currentSceneId]) {
            throw new Error(`[SCENE-MANAGER] Scene id not found: ${currentSceneId}`);
        }

        this.scenes = scenes;
        this.p = new EngineGlobal().p5;
        this.currentSceneId = currentSceneId;
        this.currentScene = this.scenes[this.currentSceneId];
        this.active = true;

        this.currentScene.setup();
    }

    changeScene(id) {
        if (!(id in this.scenes)) {
            throw new Error(`[SCENE-MANAGER] Scene id not found: ${id}`);
        }

        this.currentScene = this.scenes[id];
        this.currentSceneId = id;
        this.currentScene.setup();
    }

    update() {
        if (this.active) {
            this.currentScene.update();
        }
    }

    draw() {
        if (this.active) {
            this.currentScene.draw();
        }
    }

    setActive(active) {
        this.active = active;
    }

    getCurrentSceneId() {
        return this.currentSceneId;
    }

    getScene(id) {
        if (!(id in this.scenes)) {
            throw new Error(`[SCENE-MANAGER] Scene id not found: ${id}`);
        }
        return this.scenes[id];
    }
}