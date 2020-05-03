"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RandomNum_1 = require("../../module/RandomNum");
exports.default = (function (rooms) {
    var roomNum = RandomNum_1.Random.rangeInt(0, rooms.length - 1);
    var room = rooms[roomNum];
    var x = RandomNum_1.Random.rangeInt(room.start.x, room.end.x);
    var y = RandomNum_1.Random.rangeInt(room.start.y, room.end.y);
    var putPoint = { x: x, y: y };
    return putPoint;
});
//# sourceMappingURL=createDownstair.js.map