import EngineGlobal from './../EngineGlobal';
import Object2D from './../base_stuff/Object2D';

export default class Camera extends Object2D {
  constructor(zoom = 1.0, x = 0, y = 0) {
    super(x, y);
    this.p5 = new EngineGlobal().p5;
    this.zoom0 = zoom;
    this.x0 = x;
    this.y0 = y;
    this.zoom = zoom;
    this.x = x;
    this.y = y;
  }

  reset(zoom = this.zoom0, x = this.x0, y = this.y0) {
    this.zoom = zoom;
    this.x = x;
    this.y = y;
  }

  get mouseX() {
    return this.camX(this.p5.mouseX);
  }

  get mouseY() {
    return this.camY(this.p5.mouseY);
  }

  get pmouseX() {
    return this.camX(this.p5.pmouseX);
  }

  get pmouseY() {
    return this.camY(this.p5.pmouseY);
  }

  resetMatrix() {
    this.p5.resetMatrix();
    this.p5.translate(this.p5.width / 2, this.p5.height / 2);
    this.p5.scale(this.zoom);
    this.p5.translate(-this.x, -this.y);
  }

  camX(xCoord) {
    return this.x + (xCoord - this.p5.width / 2) / this.zoom;
  }

  camY(yCoord) {
    return this.y + (yCoord - this.p5.height / 2) / this.zoom;
  }

  scale(factor, centerX, centerY) {
    let newZoom = this.zoom * factor;
    let dx = centerX - this.p5.width / 2;
    let dy = centerY - this.p5.height / 2;
    this.x += dx / this.zoom - dx / newZoom;
    this.y += dy / this.zoom - dy / newZoom;
    this.zoom = newZoom;
  }

  translate(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  startDrag() {
    this.dragging = true;
    this.lastX = this.p5.mouseX;
    this.lastY = this.p5.mouseY;
  }

  stopDrag() {
    this.dragging = false;
  }

  draw(drawFunc) {
    this.p5.push();
    this.resetMatrix();

    drawFunc();

    this.p5.pop();
  }

  update() {
    if (this.dragging) {
      let dx = (this.lastX - this.p5.mouseX) / this.zoom;
      let dy = (this.lastY - this.p5.mouseY) / this.zoom;
      this.translate(dx, dy);
      this.lastX = this.p5.mouseX;
      this.lastY = this.p5.mouseY;
    }
  }
}
