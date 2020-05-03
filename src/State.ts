import Player from "./player/player";
import { MessageList } from "./text/messages";
import { Floor } from "./floor/Floor";
import { Enemy } from "./enemy/Enemy";

interface IState {
  floors: Floor[];
  enemys: Enemy[];
  player: Player;
  messages: MessageList;
  Frag: { [key: string]: boolean };
  env: any;
  KeyPress: any;
  seed: string;
}
export let S: IState = {
  floors: [],
  enemys: [],
  // fieldSize: { x: MapBluePrint.LX, y: MapBluePrint.LY },
  player: new Player(0, 0),
  messages: new MessageList(),
  Frag: {
    start: false,
    gameover: false,
    eyecatch: false,
  },
  env: { diagonal: false },
  KeyPress: {
    left: false,
    right: false,
    up: false,
    down: false,
  },
  seed: Date.now().toString(10),
};
