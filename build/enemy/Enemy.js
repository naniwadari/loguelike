"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EnemyId;
(function (EnemyId) {
    EnemyId[EnemyId["slime"] = 0] = "slime";
    EnemyId[EnemyId["rat"] = 1] = "rat";
})(EnemyId = exports.EnemyId || (exports.EnemyId = {}));
class Enemy {
    constructor(point, Material, level) {
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
exports.Enemy = Enemy;
