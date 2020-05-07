import { EnemyMaterial } from "./Enemy";

export enum EnemyId {
  slime = 0,
  fox = 1,
  tv = 2,
  underleg = 3,
  hayasainu = 4,
  zawatsuki = 5,
  prism = 6,
}

export const EnemyOnFloor: EnemyId[][] = [
  [], //0階
  [EnemyId.slime, EnemyId.fox], //1階
  [EnemyId.slime, EnemyId.fox], //2階
  [EnemyId.tv, EnemyId.fox],
  [EnemyId.underleg, EnemyId.fox],
  [EnemyId.underleg, EnemyId.fox],
  [EnemyId.underleg, EnemyId.fox, EnemyId.hayasainu],
  [EnemyId.tv, EnemyId.fox, EnemyId.hayasainu],
  [EnemyId.hayasainu, EnemyId.zawatsuki],
  [EnemyId.hayasainu, EnemyId.zawatsuki],
  [EnemyId.hayasainu, EnemyId.zawatsuki],
  [EnemyId.hayasainu, EnemyId.zawatsuki],
  [EnemyId.prism],
];

export const EnemyList: EnemyMaterial[] = [
  {
    id: EnemyId.slime,
    name: "でっぱり",
    level: 1,
    HP: 5,
    ATK: 1,
    DEF: 1,
    EXP: 1,
  },
  {
    id: EnemyId.fox,
    name: "置きぎつね",
    level: 1,
    HP: 7,
    ATK: 2,
    DEF: 2,
    EXP: 3,
  },
  { id: EnemyId.tv, name: "はこ", level: 3, HP: 13, ATK: 4, DEF: 4, EXP: 9 },
  {
    id: EnemyId.underleg,
    name: "またした",
    level: 3,
    HP: 15,
    ATK: 5,
    DEF: 4,
    EXP: 11,
  },
  {
    id: EnemyId.hayasainu,
    name: "スピード犬",
    level: 4,
    HP: 17,
    ATK: 6,
    DEF: 3,
    EXP: 13,
  },
  {
    id: EnemyId.zawatsuki,
    name: "ざわつき",
    level: 6,
    HP: 26,
    ATK: 7,
    DEF: 5,
    EXP: 32,
  },
  {
    id: EnemyId.prism,
    name: "ぷりずむ",
    level: 10,
    HP: 54,
    ATK: 9,
    DEF: 1,
    EXP: 89,
  },
];
