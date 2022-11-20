import { Actor, Engine } from "excalibur";
import { House } from "../actors/house/House";
import { MainHeroe } from "../actors/main-heroe/MainHeroe";

export interface GameActor extends Actor {
  game?: Engine;
  world?: World;
}

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
    new House()
  ];

  public async insertIn(game: Engine) {
    for (const actor of this.actors) {
      actor.game = game;
      actor.world = this;
      game.add(actor);
    }

    game.currentScene.camera.strategy.lockToActor(this.mainHeroe);
  }
}