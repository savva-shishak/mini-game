import { Actor, Engine, ImageSource } from "excalibur";
import { World } from "../world/World";
import Plane1Src from './planes-images/pixil-frame-0 (1).png';
import Plane2Src from './planes-images/pixil-frame-0 (2).png';
import Plane3Src from './planes-images/pixil-frame-0 (3).png';
import Plane4Src from './planes-images/pixil-frame-0 (4).png';
import Plane5Src from './planes-images/pixil-frame-0 (5).png';
import Plane6Src from './planes-images/pixil-frame-0 (6).png';
import Plane7Src from './planes-images/pixil-frame-0 (7).png';
import Plane8Src from './planes-images/pixil-frame-0 (8).png';
import Plane9Src from './planes-images/pixil-frame-0 (9).png';
import Plane10Src from './planes-images/pixil-frame-0 (10).png';

export class Plane extends Actor {
  public game!: Engine;

  public planeCelSize = 40;

  constructor(
    public world: World
  ) {
    super({
      x: 100,
      y: 100,
      width: 40,
      height: 40,
    });
  }

  async onInitialize() {
    const images = [
      new ImageSource(Plane1Src),
      new ImageSource(Plane2Src),
      new ImageSource(Plane3Src),
      new ImageSource(Plane4Src),
      new ImageSource(Plane5Src),
      new ImageSource(Plane6Src),
      new ImageSource(Plane7Src),
      new ImageSource(Plane8Src),
      new ImageSource(Plane9Src),
      new ImageSource(Plane10Src),
    ]

    await Promise.all(images.map(image => image.load()));

    this.graphics.onPreDraw = ((ctx) => {
      images.forEach(image => {
        image.data.height = this.planeCelSize;
        image.data.width = this.planeCelSize;
      });
      ctx.drawImage(images[0].data, 0, 0, this.planeCelSize, this.planeCelSize)
      
      // const placeRadius = this.planeCelSize / 2;
      // for (let x = placeRadius; x < this.world.width + placeRadius; x += this.planeCelSize) {
      //   for (let y = placeRadius; y < this.world.height + placeRadius; y += this.planeCelSize) {
      //     const str = (((x / 7) / (y / 7) * 3)) + '';
      //     const randomIndex = +(str[str.length - 1]);
      //     ctx.drawImage(images[randomIndex].data, x + this.world.x, y + this.world.y, this.planeCelSize, this.planeCelSize)
      //   }
      // }
    })
  }
}