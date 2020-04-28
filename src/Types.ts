import { Enemy } from "./enemy/Enemy";

export interface Point {
  x: number;
  y: number;
}

export interface IField {
  size: Point;
  blocks: any[];
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

export interface IRoom {
  index: number;
  size: ISize;
  point: IPoint;
  hasPath: number[];
  toPath?: number;
}
