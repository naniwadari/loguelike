import { EnemyId, EnemyMaterial } from "./Enemy";

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
];
