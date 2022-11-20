import { Color, Engine } from 'excalibur';
import { World } from './game/world/World';

const game = new Engine({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: Color.White,
});

const world = new World();

world.insertIn(game);

game.start();
