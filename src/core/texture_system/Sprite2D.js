import Object2D from "../base_stuff/Object2D";

class Sprite2D extends Object2D {
  constructor(textureResource) {
    super(0, 0);
    this.textureResource = textureResource;
  }

  draw() {
    if (!this.textureResource || !this.textureResource.width) return;
    if (!this.textureResource.smooth) this.p5.noSmooth();
    this.p5.image(this.textureResource.image, this.x, this.y, this.textureResource.width, this.textureResource.height);
  }
}


export default Sprite2D;
