"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../../config");
exports.default = (function (floor) {
    var point = floor.downstair;
    var blocks = floor.blocks;
    blocks[point.x][point.y].base = config_1.MapType.downstair;
    return blocks;
});
//# sourceMappingURL=putDownstair.js.map