import { Actor, Engine, ImageSource } from "excalibur";
import { House } from "../actors/house/House";
import { MainHeroe } from "../actors/main-heroe/MainHeroe";
import { Sheep } from "../actors/sheep/Sheep";
import PlaneSrc from './plane.png';

export interface GameActor extends Actor {
  game?: Engine;
  world?: World;
}

const planeImg = new ImageSource(PlaneSrc);

export class World {
  public readonly borders = {
    left: 1000,
    right: 1000,
    top: 1000,
    bottom: 1000,
  }

  get width() {
    return this.borders.left + this.borders.right;
  }

  get height() {
    return this.borders.top + this.borders.bottom;
  }

  get x() {
    return -this.borders.left;
  }

  get y() {
    return -this.borders.top;
  }

  mainHeroe = new MainHeroe();

  private readonly actors: GameActor[] = [
    this.mainHeroe,
    new Sheep('sheep-1'),
    new Sheep('sheep-2'),
    new Sheep('sheep-3'),
    new Sheep('sheep-4'),
    new House(),
  ];

  public async insertIn(game: Engine) {
    await planeImg.load();

    const planeActor = new Actor({
      x: 0,
      y: 0,
      width: this.width,
      height: this.height,
    });

    const sprite = planeImg.toSprite();
    sprite.width = this.width;
    sprite.height = this.height;
    
    planeActor.graphics.use(sprite);

    game.add(planeActor);

    for (const actor of this.actors) {
      actor.game = game;
      actor.world = this;
      game.add(actor);
    }

    game.currentScene.camera.strategy.lockToActor(this.mainHeroe);
  }
}