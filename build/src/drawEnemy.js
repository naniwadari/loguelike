"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var State_1 = require("./State");
var config_1 = require("./config");
exports.default = (function (con, drawStartPoint) {
    con.textBaseline = "middle";
    con.textAlign = "center";
    var enemys = State_1.S.fields[State_1.S.player.depth].enemys;
    for (var i = 0; i < enemys.length; i++) {
        if (enemys[i].point.x >= drawStartPoint.x &&
            enemys[i].point.x < drawStartPoint.x + config_1.DrawRange.x &&
            enemys[i].point.y >= drawStartPoint.y &&
            drawStartPoint.y + config_1.DrawRange.y) {
        }
    }
});
