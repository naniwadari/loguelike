"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var State_1 = require("../State");
exports.default = (function (con, alpha) {
    con.globalAlpha = alpha;
    con.fillStyle = "black";
    con.fillRect(0, 0, config_1.SCREEN.X, config_1.SCREEN.Y);
    con.textBaseline = "alphabetic";
    con.textAlign = "center";
    con.fillStyle = "white";
    con.font = "48px consolas";
    con.fillText("お試しダンジョン" + "　" + (State_1.S.player.depth + "F"), config_1.SCREEN.X / 2, config_1.SCREEN.Y / 2);
});
//# sourceMappingURL=drawEyecatch.js.map