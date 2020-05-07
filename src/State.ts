import Player from "./player/player";
import { MessageList } from "./text/messages";
import { IState } from "./Types";
import { Bag } from "./item/Bag";

export let S: IState = {
  floors: [],
  enemys: [],
  player: new Player(0, 0),
  fallItems: [],
  npcs: [],
  bags: new Bag(),
  bagCursor: 0,
  messages: new MessageList(),
  Frag: {
    start: false,
    gameover: false,
    menu: false,
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
