import { ImageSource, Input } from 'excalibur';
import ImageSrc from "./front.png"
import ImageBackSrc from "./back.png"
import ImageLeft1Src from "./left-1.png"
import ImageRight1Src from "./right-1.png"
import ImageLeft2Src from "./left-2.png"
import ImageRight2Src from "./right-2.png"
import { Mob } from '../mob/Mob';

const front = new ImageSource(ImageSrc);
const back = new ImageSource(ImageBackSrc);
const left = [new ImageSource(ImageLeft1Src), new ImageSource(ImageLeft2Src)];
const right = [new ImageSource(ImageRight1Src), new ImageSource(ImageRight2Src)];

const imagesObj = {
  front,
  up: front,
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
        width: 25,
        height: 45
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
        this.direction = 'back';
      }
      if (key === Input.Keys.ArrowDown) {
        this.direction = 'up';
      }
    });
  }
}