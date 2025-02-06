import EngineGlobal from './EngineGlobal';
import Signal from './util/Signal';

export const onMousePressed = new Signal();
export const onMouseReleased = new Signal();
export const onMouseClicked = new Signal();
export const onKeyReleased = new Signal();
export const onMouseWheelUp = new Signal();
export const onMouseWheelDown = new Signal();

export default class Engine {
    constructor(p5) {
        this.userPreload = (p) => { };
        this.userSetup = (p) => { };
        this.userDraw = (p) => { };
        new p5((p) => {
            this.p = p;
            new EngineGlobal().p5 = p;
            p.preload = () => this._ePreload(p);
            p.setup = () => this._eSetup(p);
            p.draw = () => this._eDraw(p);
            p.mousePressed = () => this._eMousePressed(p);
            p.mouseReleased = () => this._eMouseReleased(p);
            p.mouseClicked = () => this._eMouseClicked(p);
            p.keyReleased = () => this._eKeyReleased(p);
            p.mouseWheel = (event) => this.mouseWheel(event);
        });
    }

    mouseWheel(event) {
        if (event.delta > 0) {
            onMouseWheelDown.emit();
        } else {
            onMouseWheelUp.emit();
        }
        // Uncomment to prevent any default behavior.
        // return false;
    }

    preload(f = () => { }) {
        this.userPreload = f;
    }

    setup(f = (p) => { }) {
        this.userSetup = f;
    }
    draw(f = (p) => { }) {
        this.userDraw = f;
    }

    _ePreload(p) {
        this.userPreload(p);
    }

    _eSetup(p) {
        this.userSetup(p);
    }
    _eDraw(p) {
        this.userDraw(p);
    }

    _eMousePressed(p) {
        onMousePressed.emit();
    }

    _eMouseReleased(p) {
        onMouseReleased.emit();
    }

    _eMouseClicked(p) {
        onMouseClicked.emit();
    }

    _eKeyReleased(p) {
        onKeyReleased.emit(p.key, p.keyCode);
    }
}