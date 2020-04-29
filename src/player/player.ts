import { MapType } from "../config";
import { S } from "../State";
import { Point } from "../Types";
export default class Player {
  depth: number;
  point: Point;
  x: number;
  y: number;
  HP: number;
  ATK: number;
  DEF: number;
  level: number;
  baseHP: number;
  equipHP: number;
  baseATK: number;
  equipATK: number;
  baseDEF: number;
  equipDEF: number;
  EXP: number;
  requireEXP: number;

  constructor(x: number, y: number) {
    this.depth = 0;
    this.point = { x: x, y: y };
    this.x = x;
    this.y = y;
    this.level = 1;
    this.baseHP = 16;
    this.equipHP = 0;
    this.baseATK = 4;
    this.equipATK = 0;
    this.baseDEF = 4;
    this.equipDEF = 0;
    this.EXP = 0;
    this.requireEXP = 4;
    this.HP = this.totalHP;
    this.ATK = this.totalATK;
    this.DEF = this.totalDEF;
  }

  get totalHP() {
    return this.baseHP + this.equipHP;
  }
  get totalATK() {
    return this.baseATK + this.equipATK;
  }
  get totalDEF() {
    return this.baseDEF + this.equipDEF;
  }

  moveLeft() {
    if (this.x === 0) {
      return this;
    }
    this.x = --this.x;
    return this;
  }

  moveUp() {
    if (this.y === 0) {
      return this;
    }
    this.y = --this.y;
    return this;
  }

  moveRight() {
    if (this.x === S.fieldSize.x - 1) {
      return this;
    }
    this.x = ++this.x;
    return this;
  }

  moveDown() {
    if (this.y === S.fieldSize.y - 1) {
      return this;
    }
    this.y = ++this.y;
    return this;
  }

  moveUpperLeft() {
    if (this.x === 0 || this.y === 0) {
      return this;
    }
    this.x = --this.x;
    this.y = --this.y;
    return this;
  }

  moveUpperRight() {
    if (this.x === S.fieldSize.x - 1 || this.y === 0) {
      return this;
    }
    this.x = ++this.x;
    this.y = --this.y;
    return this;
  }

  moveDownnerLeft() {
    if (this.x === S.fieldSize.x - 1 || this.y === S.fieldSize.y - 1) {
      return this;
    }
    this.x = --this.x;
    this.y = ++this.y;
    return this;
  }

  moveDownnerRight() {
    if (this.x === S.fieldSize.x - 1 || this.y === S.fieldSize.y - 1) {
      return this;
    }
    this.x = ++this.x;
    this.y = ++this.y;
    return this;
  }

  stairDown() {
    const block = S.floors[this.depth].blocks[this.x][this.y];
    if (block.base === MapType.downstair) {
      ++this.depth;
    }
  }
}
