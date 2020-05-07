import { EnemyId, EnemyMaterial } from "./Enemy";

export const EnemyOnFloor: EnemyId[][] = [
  [], //0階
  [EnemyId.slime, EnemyId.fox], //1階
  [EnemyId.slime, EnemyId.fox], //2階
  [EnemyId.tv, EnemyId.fox],
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
];
