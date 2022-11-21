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
      front?: ImageSource,
      up?: ImageSource,
      back?: ImageSource,
      left?: ImageSource,
      right?: ImageSource,
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
      .map(key => (this.images as any)[key] as ImageSource)
      .filter(image => !!image);
    await Promise.all(images.map(image => image.load()));
    images.forEach((image) => {
      image.data.height = 50;
      image.data.width = 50
    });

    this.graphics.onPreDraw = ((ctx, delta) => {
      this.amplitudeDelta += delta / 10;
      const range = this.direction === 'front' ? 0 : (Math.sin(this.amplitudeDelta / 3) * 3);
      const source = this.images[this.direction];
      if (source) {
        ctx.drawImage(source.data, -25, range - 25, 50, 50);
      }
    })

    this.onPreUpdate = (_, delta) => {
      switch (this.direction) {
        case 'back':
          this.pos.y += (this.speed * delta / 1000);
          break;
        case 'up':
          this.pos.y -= (this.speed * delta / 1000);
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