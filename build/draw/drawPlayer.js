"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
exports.default = (con, playerDrawPoint) => {
    con.textBaseline = "middle";
    con.textAlign = "center";
    con.fillStyle = "black";
    con.font = "24px consolas";
    con.fillText("@", playerDrawPoint.x * config_1.TyleSize.x + config_1.TyleSize.x / 2, playerDrawPoint.y * config_1.TyleSize.y + config_1.TyleSize.y / 2);
};
