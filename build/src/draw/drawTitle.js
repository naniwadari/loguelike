"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var text_1 = require("../text");
var config_1 = require("../config");
exports.default = (function (con) {
    con.textBaseline = "alphabetic";
    con.textAlign = "center";
    con.fillStyle = "white";
    con.font = "48px consolas";
    con.fillText(text_1.TEXT.title, config_1.SCREEN.X / 2, config_1.SCREEN.Y / 4);
    con.font = "32px consolas";
    con.fillText("> " + text_1.TEXT.start, config_1.SCREEN.X / 2, (config_1.SCREEN.Y / 4) * 3);
});
