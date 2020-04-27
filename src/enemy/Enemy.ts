import { Point } from "../Types";

export enum EnemyId {
  slime = 0,
  rat = 1,
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
}
