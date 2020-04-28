"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
class Map {
    constructor(BluePrint) {
        this.B_FLOOR = 0;
        this.B_WALL = 1;
        this.B_DOWNSTAIR = 2;
        this.B_CAN_STAND = [];
        this.LX = BluePrint.LX;
        this.LY = BluePrint.LY;
        this.PX = BluePrint.PX;
        this.PY = BluePrint.PY;
        this.B_CAN_STAND[this.B_DOWNSTAIR] = true;
        this.B_CAN_STAND[this.B_FLOOR] = true;
        this.B_CAN_STAND[this.B_WALL] = false;
    }
}
exports.map = new Map(config_1.MapBluePrint);
