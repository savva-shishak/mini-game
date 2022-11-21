import { Mob } from "../mob/Mob";
import ImageSrc from "./front.png"
import ImageLeftSrc from "./left.png"
import ImageRightSrc from "./right.jpg"
import { ImageSource } from "excalibur";

const front = new ImageSource(ImageSrc);
const left = new ImageSource(ImageLeftSrc);
const right = new ImageSource(ImageRightSrc);

export class Sheep extends Mob {
  constructor(name: string) {
    super(
      {
        front,
        left,
        right,
      },
      {
        name,
        x: Math.random() * 300 >> 0,
        y: Math.random() * 300 >> 0,
        width: 30,
        height: 30,
      }
    );
    this.speed = 50;
    this.updateDirection();
  }

  updateDirection() {
    const dirs = ['front', 'left', 'right'];

    this.direction = dirs[Math.random() * dirs.length >> 0] as any;

    setTimeout(() => this.updateDirection(), Math.random() * 10000);
  }
}