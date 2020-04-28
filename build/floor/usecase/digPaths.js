"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Dig_1 = __importDefault(require("../Dig"));
const config_1 = require("../../config");
exports.default = (floor, blocks) => {
    for (let i = 0; i < floor.gates.length; i++) {
        let gate = floor.gates[i];
        if (gate.direction === config_1.Direction.left ||
            gate.direction === config_1.Direction.right) {
            blocks = new Dig_1.default(gate.A, gate.B).sideToside(blocks);
        }
        else {
            blocks = new Dig_1.default(gate.A, gate.B).topTobottom(blocks);
        }
    }
    return blocks;
};
