import { MapType } from "../config";
import { Point, IItem, IBag } from "../Types";
import { Weapon } from "../item/Weapon";
import { Floor } from "../floor/Floor";
import { ItemType } from "../config/item";
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
  weapon?: IBag;
  shield?: IBag;

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

  usePotion(bag: IBag) {
    let item = bag.item;
    let recoverHP = this.HP + item.HP;
    this.equipATK = this.equipATK + item.ATK;
    this.equipDEF = this.equipDEF + item.DEF;
    if (recoverHP >= this.totalHP) {
      recoverHP = this.totalHP;
    }
    this.HP = recoverHP;
  }

  equip(bag: IBag) {
    let item = bag.item;
    this.equipATK = this.equipATK + item.ATK;
    this.equipDEF = this.equipDEF + item.DEF;
    this.equipHP = this.equipHP + item.HP;
    if (item.types === ItemType.weapon) {
      this.weapon = bag;
      return;
    }
    if (item.types === ItemType.shield) {
      this.shield = bag;
      return;
    }
    return;
  }

  removeEquip(bag: IBag) {
    let item = bag.item;
    this.equipATK = this.equipATK - item.ATK;
    this.equipDEF = this.equipDEF - item.DEF;
    this.equipHP = this.equipHP - item.HP;
    if (item.types === ItemType.weapon) {
      this.weapon = undefined;
      return;
    }
    if (item.types === ItemType.shield) {
      this.shield = undefined;
      return;
    }
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

  moveRight(floor: Floor) {
    if (this.x === floor.size.width - 1) {
      return this;
    }
    this.x = ++this.x;
    return this;
  }

  moveDown(floor: Floor) {
    if (this.y === floor.size.height - 1) {
      return this;
    }
    this.y = ++this.y;
    return this;
  }

  moveUpperLeft(floor: Floor) {
    if (this.x === 0 || this.y === 0) {
      return this;
    }
    this.x = --this.x;
    this.y = --this.y;
    return this;
  }

  moveUpperRight(floor: Floor) {
    if (this.x === floor.size.width - 1 || this.y === 0) {
      return this;
    }
    this.x = ++this.x;
    this.y = --this.y;
    return this;
  }

  moveDownnerLeft(floor: Floor) {
    if (this.x === floor.size.width - 1 || this.y === floor.size.height - 1) {
      return this;
    }
    this.x = --this.x;
    this.y = ++this.y;
    return this;
  }

  moveDownnerRight(floor: Floor) {
    if (this.x === floor.size.width - 1 || this.y === floor.size.height - 1) {
      return this;
    }
    this.x = ++this.x;
    this.y = ++this.y;
    return this;
  }

  stairDown(floor: Floor) {
    // let floor = S.floors[this.depth];
    const block = floor.blocks[this.x][this.y];
    if (block.base === MapType.downstair) {
      ++this.depth;
    }
  }
}
