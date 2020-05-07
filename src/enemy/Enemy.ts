import { Point } from "../Types";
import { S } from "../State";
export enum EnemyId {
  slime = 0,
  fox = 1,
  tv = 2,
}

export interface EnemyMaterial {
  name: string;
  id: EnemyId;
  level: number;
  HP: number;
  ATK: number;
  DEF: number;
  EXP: number;
}

export class Enemy {
  name: string;
  point: Point;
  id: EnemyId;
  level: number;
  HP: number;
  ATK: number;
  DEF: number;
  baseHP: number;
  equipHP: number;
  baseATK: number;
  equipATK: number;
  baseDEF: number;
  equipDEF: number;
  EXP: number;

  constructor(point: Point, Material: EnemyMaterial, level?: number) {
    this.name = Material.name;
    this.point = point;
    this.id = Material.id;
    this.level = Material.level;
    this.baseHP = Material.HP;
    this.equipHP = 0;
    this.baseATK = Material.ATK;
    this.equipATK = 0;
    this.baseDEF = Material.DEF;
    this.equipDEF = 0;
    this.EXP = Material.EXP;

    //レベルが与えられていた場合はレベルアップ処理
    if (level) {
      while (level > this.level) {
        this.level++;
        this.baseHP = Math.ceil(this.baseHP * 1.2);
        this.baseATK = Math.ceil(this.baseATK * 1.1);
        this.baseDEF = Math.ceil(this.baseDEF * 1.1);
        this.EXP = Math.ceil(this.EXP * 1.4);
      }
    }

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
    if (this.point.x === 0) {
      return this;
    }
    this.point.x = --this.point.x;
    return this;
  }
  moveUp() {
    if (this.point.y === 0) {
      return this;
    }
    this.point.y = --this.point.y;
    return this;
  }

  moveRight() {
    if (this.point.x === S.floors[S.player.depth].size.width - 1) {
      return this;
    }
    this.point.x = ++this.point.x;
    return this;
  }

  moveDown() {
    if (this.point.y === S.floors[S.player.depth].size.height - 1) {
      return this;
    }
    this.point.y = ++this.point.y;
    return this;
  }

  moveUpperLeft() {
    if (this.point.x === 0 || this.point.y === 0) {
      return this;
    }
    this.point.x = --this.point.x;
    this.point.y = --this.point.y;
    return this;
  }

  moveUpperRight() {
    if (
      this.point.x === S.floors[S.player.depth].size.width - 1 ||
      this.point.y === 0
    ) {
      return this;
    }
    this.point.x = ++this.point.x;
    this.point.y = --this.point.y;
    return this;
  }

  moveDownnerLeft() {
    if (
      this.point.x === S.floors[S.player.depth].size.width - 1 ||
      this.point.y === S.floors[S.player.depth].size.height - 1
    ) {
      return this;
    }
    this.point.x = --this.point.x;
    this.point.y = ++this.point.y;
    return this;
  }

  moveDownnerRight() {
    if (
      this.point.x === S.floors[S.player.depth].size.width - 1 ||
      this.point.y === S.floors[S.player.depth].size.height - 1
    ) {
      return this;
    }
    this.point.x = ++this.point.x;
    this.point.y = ++this.point.y;
    return this;
  }
}
