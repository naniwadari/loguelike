"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RandomNum_1 = require("./RandomNum");
var PointMaker;
(function (PointMaker) {
    function room(room) {
        const x_min = room.start.x;
        const x_max = room.end.y;
        const y_min = room.start.y;
        const y_max = room.end.y;
        const x_point = RandomNum_1.Random.rangeInt(x_min, x_max);
        const y_point = RandomNum_1.Random.rangeInt(y_min, y_max);
        return { x: x_point, y: y_point };
    }
    PointMaker.room = room;
})(PointMaker = exports.PointMaker || (exports.PointMaker = {}));
