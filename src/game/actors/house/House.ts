import { Actor, ImageSource } from "excalibur";
import ImageSrc from './image.png';

const image = new ImageSource(ImageSrc);

export class House extends Actor {
  constructor() {
    super({
      x: 300,
      y: 120,
      width: 100,
      height: 100,
    })
  }

  public async onInitialize() {
    await image.load();
    const sprite = image.toSprite();
    sprite.width = 100;
    sprite.height = 100;
    this.graphics.use(sprite);
  }
}