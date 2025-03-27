import Sprite2D from "./Sprite2D";

class AnimatedSprite2D extends Sprite2D {
  constructor(animResource) {
    super(animResource.frames[0]);

    this.textureResource = animResource;
    this.currentFrameIndex = 0;
    this.isAnimating = true;
    this.animationSpeed = 0.05;
  }

  draw() {
    if (!this.textureResource?.frames?.length) return;
    this.p5[this.textureResource.smooth ? "smooth" : "noSmooth"]();

    const frame = this.textureResource.frames[Math.floor(this.currentFrameIndex)];

    if (frame?.image) {
      this.p5.image(
        frame.image,
        this.x,
        this.y,
        this.textureResource.width,
        this.textureResource.height
      );
    }
  }
  update() {
    if (this.isAnimating) {
      this.currentFrameIndex = (this.currentFrameIndex + this.animationSpeed) % this.textureResource.frames.length;
    }    

  }
}

export default AnimatedSprite2D;
