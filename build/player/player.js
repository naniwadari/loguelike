"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var State_1 = require("../State");
var Player = /** @class */ (function () {
    function Player(x, y) {
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
    Object.defineProperty(Player.prototype, "totalHP", {
        get: function () {
            return this.baseHP + this.equipHP;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "totalATK", {
        get: function () {
            return this.baseATK + this.equipATK;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "totalDEF", {
        get: function () {
            return this.baseDEF + this.equipDEF;
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.moveLeft = function () {
        if (this.x === 0) {
            return this;
        }
        this.x = --this.x;
        return this;
    };
    Player.prototype.moveUp = function () {
        if (this.y === 0) {
            return this;
        }
        this.y = --this.y;
        return this;
    };
    Player.prototype.moveRight = function () {
        if (this.x === State_1.S.fieldSize.x - 1) {
            return this;
        }
        this.x = ++this.x;
        return this;
    };
    Player.prototype.moveDown = function () {
        if (this.y === State_1.S.fieldSize.y - 1) {
            return this;
        }
        this.y = ++this.y;
        return this;
    };
    Player.prototype.moveUpperLeft = function () {
        if (this.x === 0 || this.y === 0) {
            return this;
        }
        this.x = --this.x;
        this.y = --this.y;
        return this;
    };
    Player.prototype.moveUpperRight = function () {
        if (this.x === State_1.S.fieldSize.x - 1 || this.y === 0) {
            return this;
        }
        this.x = ++this.x;
        this.y = --this.y;
        return this;
    };
    Player.prototype.moveDownnerLeft = function () {
        if (this.x === State_1.S.fieldSize.x - 1 || this.y === State_1.S.fieldSize.y - 1) {
            return this;
        }
        this.x = --this.x;
        this.y = ++this.y;
        return this;
    };
    Player.prototype.moveDownnerRight = function () {
        if (this.x === State_1.S.fieldSize.x - 1 || this.y === State_1.S.fieldSize.y - 1) {
            return this;
        }
        this.x = ++this.x;
        this.y = ++this.y;
        return this;
    };
    Player.prototype.stairDown = function () {
        var block = State_1.S.fields[this.depth].blocks[this.x][this.y];
        if (block.base === config_1.MapType.downstair) {
            ++this.depth;
        }
        else {
        }
    };
    return Player;
}());
exports.default = Player;
