import { Actor, ActorArgs, Engine, ImageSource } from 'excalibur';
import { World } from '../../world/World';

export class Mob extends Actor {
  public game!: Engine;
  public world!: World;
  protected direction: 'front' | 'up' | 'back' | 'left' | 'right' = 'front';
  protected amplitudeDelta = 0;
  protected speed: number = 500;

  constructor(
    protected images: { 
      front?: ImageSource | ImageSource[],
      up?: ImageSource | ImageSource[],
      back?: ImageSource | ImageSource[],
      left?: ImageSource | ImageSource[],
      right?: ImageSource | ImageSource[],
     },
     actorArgs: ActorArgs,
  ) {
    super(actorArgs);
  }

  protected onInit() {}
  protected onUpdate() {}

  public async onInitialize() {
    const images = Object
      .keys(this.images)
      .map(key => (this.images as any)[key] as (ImageSource | ImageSource[]))
      .filter(image => !!image);
    await Promise.all(
      images
        .flatMap(image => Array.isArray(image) ? image : [image])
        .map(image => image.load())
    );
    images
      .flatMap(image => Array.isArray(image) ? image : [image])
      .forEach((image) => {
        image.data.height = this.height;
        image.data.width = this.width;
      });

    this.graphics.onPreDraw = ((ctx, delta) => {
      this.amplitudeDelta += delta / 10;
      if (this.amplitudeDelta > 100) {
        this.amplitudeDelta = 0;
      }
      const range = this.direction === 'front' ? 0 : (Math.sin(this.amplitudeDelta / 3) * 3);
      const source = this.images[this.direction];
      
      if (source) {
        if (Array.isArray(source)) {
          if (((this.amplitudeDelta / 10) >> 0) % 2 === 0) {
            ctx.drawImage(source[0].data, -(this.width / 2), range - (this.height / 2), this.width, this.height);
          } else {
            ctx.drawImage(source[1].data, -(this.width / 2), range - (this.height / 2), this.width, this.height);
          }
        } else {
          ctx.drawImage(source.data, -(this.width / 2), range - (this.height / 2), this.width, this.height);
        }
      }
    })

    this.onPreUpdate = (_, delta) => {
      switch (this.direction) {
        case 'back':
          this.pos.y -= (this.speed * delta / 1000);
          break;
        case 'up':
          this.pos.y += (this.speed * delta / 1000);
          break;
        case 'left':
          this.pos.x -= (this.speed * delta / 1000);
          break;
        case 'right':
          this.pos.x += (this.speed * delta / 1000);
          break;
      }
      this.onUpdate();
    };

    this.onInit();
  }
}