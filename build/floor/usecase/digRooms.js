"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Dig_1 = __importDefault(require("../Dig"));
exports.default = (floor, blocks) => {
    for (let i = 0; i < floor.rooms.length; i++) {
        let room = floor.rooms[i];
        blocks = new Dig_1.default(room.start, room.end).square(blocks);
    }
    return blocks;
};
