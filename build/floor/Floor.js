"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var Dig_1 = __importDefault(require("./Dig"));
var Floor = /** @class */ (function () {
    function Floor(floorSize, rooms, gates) {
        this.size = floorSize;
        this.rooms = rooms;
        this.gates = gates;
    }
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
