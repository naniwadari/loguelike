"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
exports.default = (floor, blocks) => {
    for (let i = 0; i <= floor.size.width; i++) {
        blocks[i] = [];
        for (let j = 0; j <= floor.size.height; j++) {
            blocks[i][j] = { base: config_1.MapType.wall };
        }
    }
    return blocks;
};
