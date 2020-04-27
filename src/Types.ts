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
