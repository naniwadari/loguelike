"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Room_1 = __importDefault(require("../Room"));
var Floor_1 = require("../Floor");
var fillUpWall_1 = __importDefault(require("../usecase/fillUpWall"));
var digRooms_1 = __importDefault(require("../usecase/digRooms"));
var putDownstair_1 = __importDefault(require("../usecase/putDownstair"));
/* 一階の設計図 */
var point = { x: 1, y: 1 };
var size = { width: 23, height: 23 };
var rooms = [new Room_1.default(point, size, 1)];
var downstair = { x: 13, y: 7 };
var gates = [];
var floorSize = { width: 25, height: 25 };
var firstFloor = new Floor_1.Floor(floorSize, rooms, gates, downstair);
exports.firstFloor = firstFloor;
firstFloor.blocks = fillUpWall_1.default(firstFloor, firstFloor.blocks);
firstFloor.blocks = digRooms_1.default(firstFloor, firstFloor.blocks);
firstFloor.blocks = putDownstair_1.default(firstFloor);
//# sourceMappingURL=firstFloor.js.map