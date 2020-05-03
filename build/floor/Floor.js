"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var Dig_1 = __importDefault(require("./Dig"));
var RandomNum_1 = require("../module/RandomNum");
var Floor = /** @class */ (function () {
    function Floor(floorSize, rooms, gates, downstair) {
        this.size = floorSize;
        this.rooms = rooms;
        this.gates = gates;
        this.downstair = downstair;
        this.blocks = [];
    }
    Floor.prototype.coordinateCanStand = function () {
        var roomNum = RandomNum_1.Random.rangeInt(0, this.rooms.length - 1);
        var room = this.rooms[roomNum];
        var x = RandomNum_1.Random.rangeInt(room.start.x, room.end.x);
        var y = RandomNum_1.Random.rangeInt(room.start.y, room.end.y);
        var point = { x: x, y: y };
        return point;
    };
    Floor.prototype.isInFloor = function (point) {
        var result = false;
        if (point.x > 0 &&
            point.x < this.size.width - 2 &&
            point.y > 0 &&
            point.y < this.size.height - 2) {
            result = true;
        }
        return result;
    };
    Floor.prototype.isCanStand = function (point) {
        var isCanStand = false;
        var x = point.x;
        var y = point.y;
        if (this.blocks[x][y].base === config_1.MapType.floor) {
            isCanStand = true;
        }
        return isCanStand;
    };
    Floor.prototype.fillWall = function (blocks) {
        for (var i = 0; i <= this.size.width; i++) {
            blocks[i] = [];
            for (var j = 0; j <= this.size.height; j++) {
                blocks[i][j] = { base: config_1.MapType.wall };
            }
        }
    };
    Floor.prototype.digPaths = function (blocks) {
        for (var i = 0; i < this.gates.length; i++) {
            var gate = this.gates[i];
            if (gate.direction === config_1.Direction.left ||
                gate.direction === config_1.Direction.right) {
                new Dig_1.default(gate.A, gate.B).sideToside(blocks);
            }
            else {
                new Dig_1.default(gate.A, gate.B).topTobottom(blocks);
            }
        }
    };
    return Floor;
}());
exports.Floor = Floor;
//# sourceMappingURL=Floor.js.map