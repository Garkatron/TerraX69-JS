import EngineGlobal from "../EngineGlobal";
import { Drawable } from "./Drawable";
import { Updatable } from "./Updatable";

class Object2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.p5 = new EngineGlobal().p5;
  }

  setX(x) {
    this.x = x;
    return this;
  }

  setY(y) {
      this.y = y;
      return this;
  }

}

Object2D = Drawable(Updatable(Object2D));

export default Object2D;
