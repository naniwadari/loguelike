"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var text_1 = require("../text");
var config_1 = require("../config");
var State_1 = require("../State");
exports.default = (function (con) {
    con.save();
    con.textBaseline = "top";
    con.textAlign = "left";
    con.font = "24px consolas";
    con.fillStyle = "white";
    con.translate(config_1.DrawRange.x * config_1.TyleSize.x, 0);
    con.fillText(State_1.S.player.depth + text_1.TEXT.depth, 8, (24 + 6) * 0 + 8);
    con.restore();
});
