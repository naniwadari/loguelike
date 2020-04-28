"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const State_1 = require("../State");
class Player {
    constructor(x, y) {
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
        if (this.x === State_1.S.fieldSize.x - 1) {
            return this;
        }
        this.x = ++this.x;
        return this;
    }
    moveDown() {
        if (this.y === State_1.S.fieldSize.y - 1) {
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
        if (this.x === State_1.S.fieldSize.x - 1 || this.y === 0) {
            return this;
        }
        this.x = ++this.x;
        this.y = --this.y;
        return this;
    }
    moveDownnerLeft() {
        if (this.x === State_1.S.fieldSize.x - 1 || this.y === State_1.S.fieldSize.y - 1) {
            return this;
        }
        this.x = --this.x;
        this.y = ++this.y;
        return this;
    }
    moveDownnerRight() {
        if (this.x === State_1.S.fieldSize.x - 1 || this.y === State_1.S.fieldSize.y - 1) {
            return this;
        }
        this.x = ++this.x;
        this.y = ++this.y;
        return this;
    }
    stairDown() {
        const block = State_1.S.fields[this.depth].blocks[this.x][this.y];
        if (block.base === config_1.MapType.downstair) {
            ++this.depth;
        }
        else {
        }
    }
}
exports.default = Player;
