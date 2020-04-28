"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enemy_1 = require("./Enemy");
exports.EnemyOnFloor = [
    [],
    [Enemy_1.EnemyId.slime, Enemy_1.EnemyId.rat],
    [Enemy_1.EnemyId.slime, Enemy_1.EnemyId.rat],
];
exports.EnemyList = [
    {
        id: Enemy_1.EnemyId.slime,
        name: "スライム",
        level: 1,
        HP: 5,
        ATK: 1,
        DEF: 1,
        EXP: 1,
    },
    {
        id: Enemy_1.EnemyId.rat,
        name: "大ネズミ",
        level: 1,
        HP: 7,
        ATK: 2,
        DEF: 2,
        EXP: 3,
    },
];
