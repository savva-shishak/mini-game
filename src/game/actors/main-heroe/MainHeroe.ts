import { Actor, Engine, ImageSource, Input } from 'excalibur';
import { World } from '../../world/World';
import ImageSrc from "./front.png"
import ImageUpSrc from "./up.png"
import ImageBackSrc from "./back.png"
import ImageLeftSrc from "./left.png"
import ImageRightSrc from "./Right.png"

const front = new ImageSource(ImageSrc);
const up = new ImageSource(ImageUpSrc);
const back = new ImageSource(ImageBackSrc);
const left = new ImageSource(ImageLeftSrc);
const right = new ImageSource(ImageRightSrc);

const images = [
  front,
  up,
  back,
  left,
  right,
];

const imagesObj = {
  front,
  up,
  back,
  left,
  right,
};

export class MainHeroe extends Actor {
  public game!: Engine;
  public world!: World;
  private direction: 'front' | 'up' | 'back' | 'left' | 'right' = 'front';

  constructor() {
    super({
      name: 'mainHeroe',
      x: 0,
      y: 0,
      width: 50,
      height: 50
    });
  }

  public async onInitialize() {
    await Promise.all(images.map(image => image.load()));
    images.forEach((image) => {
      image.data.height = 50;
      image.data.width = 50
    });

    this.graphics.onPreDraw = ((ctx) => {
      ctx.drawImage(imagesObj[this.direction].data, -25, -25, 50, 50);
    })

    this.game.input.keyboard.on('release', ({ key }) => {
      const { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } = Input.Keys;
      if ([ArrowDown, ArrowLeft, ArrowRight, ArrowUp].includes(key)) {
        this.direction = 'front'; 
      }
    })

    this.game.input.keyboard.on('hold', ({ key }) => {
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

    this.onPreUpdate = (_, delta) => {
      console.log(delta);
      
      switch (this.direction) {
        case 'back':
          this.pos.y += 500 * delta / 1000;
          break;
        case 'up':
          this.pos.y -= 500 * delta / 1000;
          break;
        case 'left':
          this.pos.x -= 500 * delta / 1000;
          break;
        case 'right':
          this.pos.x += 500 * delta / 1000;
          break;
      }
    };
  }
}