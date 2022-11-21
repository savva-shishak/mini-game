import { ImageSource, Input } from 'excalibur';
import ImageSrc from "./front.png"
import ImageUpSrc from "./up.png"
import ImageBackSrc from "./back.png"
import ImageLeftSrc from "./left.png"
import ImageRightSrc from "./right.png"
import { Mob } from '../mob/Mob';

const front = new ImageSource(ImageSrc);
const up = new ImageSource(ImageUpSrc);
const back = new ImageSource(ImageBackSrc);
const left = new ImageSource(ImageLeftSrc);
const right = new ImageSource(ImageRightSrc);

const imagesObj = {
  front,
  up,
  back,
  left,
  right,
};

export class MainHeroe extends Mob {

  constructor() {
    super(
      imagesObj,
      {
        name: 'mainHeroe',
        x: 0,
        y: 0,
        width: 50,
        height: 50
      }
    );
  }

  public async onInit() {
    this.game.input.keyboard.on('release', () => {
      this.direction = 'front';
    })

    this.game.input.keyboard.on('hold', ({ key }) => {
      this.direction = 'front';

      if (key === Input.Keys.ArrowLeft) {
        this.direction = 'left';
      }
      if (key === Input.Keys.ArrowRight) {
        this.direction = 'right';
      }
      if (key === Input.Keys.ArrowUp) {
        this.direction = 'up';
      }
      if (key === Input.Keys.ArrowDown) {
        this.direction = 'back';
      }
    });
  }
}