import { Enemy } from "./enemy/Enemy";
import { MapType, Direction } from "./config";
import { ItemId, ItemType } from "./config/item";

export interface Point {
  x: number;
  y: number;
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
