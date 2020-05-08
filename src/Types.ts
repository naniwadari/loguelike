import { Enemy } from "./enemy/Enemy";
import { MapType, Direction, MessageType } from "./config";
import { ItemId, ItemType } from "./config/item";
import { Floor } from "./floor/Floor";
import Player from "./player/player";
import { MessageList } from "./text/messages";
import { Bag } from "./item/Bag";
import { Weapon } from "./item/Weapon";
import { Shield } from "./item/Shield";
import { Potion } from "./item/Potion";
import { NpcId, NpcType } from "./config/npc";
import { Npc } from "./npc/Npc";

export interface Point {
  x: number;
  y: number;
}

export interface IMessage {
  text: string;
  type: MessageType;
}

export interface INpc {
  id: NpcId;
  type: NpcType;
  name: string;
  serif: IMessage[];
}

export interface IArea {
  start: IPoint;
  end: IPoint;
}
export interface IGate {
  A: IPoint;
  B: IPoint;
  direction: Direction;
}

export interface IField {
  size: Point;
  blocks: any[];
  enemys: Enemy[];
}

export interface IBlock {
  base: MapType;
}

export interface IFloor {
  size: IPoint;
  blocks: IBlock[][];
  enemys: Enemy[];
}

export interface ISize {
  width: number;
  height: number;
}

export interface IPoint {
  x: number;
  y: number;
}

export interface IItem {
  id: ItemId;
  types: ItemType;
  name: string;
  ATK: number;
  DEF: number;
  HP: number;
}

export interface IRoom {
  index: number;
  size: ISize;
  point: IPoint;
  hasPath: number[];
  toPath?: number;
}

export interface IState {
  floors: Floor[];
  enemys: Enemy[];
  player: Player;
  fallItems: IFallItem[];
  npcs: Npc[];
  bags: Bag;
  bagCursor: number;
  messages: MessageList;
  Frag: { [key: string]: boolean };
  env: any;
  KeyPress: any;
  seed: string;
  another: boolean;
}

export interface IFallItem {
  index: number;
  point: IPoint;
  item: IItem;
}

export interface IBag {
  index: number;
  item: IItem | Weapon | Shield | Potion;
}
