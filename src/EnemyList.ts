import { EnemyId, EnemyMaterial } from "./Enemy";

export const EnemyList: EnemyMaterial[] = [
  {
    id: EnemyId.slime,
    name: "スライム",
    level: 1,
    HP: 5,
    ATK: 1,
    DEF: 1,
    EXP: 1,
  },
  {
    id: EnemyId.rat,
    name: "大ネズミ",
    level: 1,
    HP: 7,
    ATK: 2,
    DEF: 2,
    EXP: 3,
  },
];
