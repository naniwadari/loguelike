"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const Dig_1 = __importDefault(require("./Dig"));
class Floor {
    constructor(floorSize, rooms, gates) {
        this.size = floorSize;
        this.rooms = rooms;
        this.gates = gates;
    }
    fillWall(blocks) {
        for (let i = 0; i <= this.size.width; i++) {
            blocks[i] = [];
            for (let j = 0; j <= this.size.height; j++) {
                blocks[i][j] = { base: config_1.MapType.wall };
            }
        }
    }
    digPaths(blocks) {
        for (let i = 0; i < this.gates.length; i++) {
            let gate = this.gates[i];
            if (gate.direction === config_1.Direction.left ||
                gate.direction === config_1.Direction.right) {
                new Dig_1.default(gate.A, gate.B).sideToside(blocks);
            }
            else {
                new Dig_1.default(gate.A, gate.B).topTobottom(blocks);
            }
        }
    }
}
exports.Floor = Floor;
