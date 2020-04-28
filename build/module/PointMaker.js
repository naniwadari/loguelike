"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Random_1 = require("../module/Random");
var PointMaker;
(function (PointMaker) {
    function room(room) {
        var x_min = room.start.x;
        var x_max = room.end.y;
        var y_min = room.start.y;
        var y_max = room.end.y;
        var x_point = Random_1.Random.rangeInt(x_min, x_max);
        var y_point = Random_1.Random.rangeInt(y_min, y_max);
        return { x: x_point, y: y_point };
    }
    PointMaker.room = room;
})(PointMaker = exports.PointMaker || (exports.PointMaker = {}));
