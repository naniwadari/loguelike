"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../../config");
exports.default = (function (floor, blocks) {
    for (var i = 0; i <= floor.size.width; i++) {
        blocks[i] = [];
        for (var j = 0; j <= floor.size.height; j++) {
            blocks[i][j] = { base: config_1.MapType.wall };
        }
    }
    return blocks;
});
