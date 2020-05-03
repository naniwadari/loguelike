"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createRooms_1 = __importDefault(require("./usecase/createRooms"));
var createDownstair_1 = __importDefault(require("./usecase/createDownstair"));
var createGates_1 = require("./usecase/createGates");
var fillUpWall_1 = __importDefault(require("./usecase/fillUpWall"));
var digRooms_1 = __importDefault(require("./usecase/digRooms"));
var digPaths_1 = __importDefault(require("./usecase/digPaths"));
var putDownstair_1 = __importDefault(require("./usecase/putDownstair"));
var config_1 = require("../config");
var Floor_1 = require("./Floor");
exports.default = (function (floorSize) {
    var rooms = [];
    var gates = [];
    var downstair;
    //部屋の生成
    rooms = createRooms_1.default(config_1.RoomConf.trialNum, floorSize);
    //ゲートポイントの生成
    var result = createGates_1.createGates(rooms);
    gates = result.gates;
    rooms = result.rooms;
    downstair = createDownstair_1.default(rooms);
    console.log(gates);
    console.log(rooms);
    var floor = new Floor_1.Floor(floorSize, rooms, gates, downstair);
    floor.blocks = fillUpWall_1.default(floor, floor.blocks);
    floor.blocks = digRooms_1.default(floor, floor.blocks);
    floor.blocks = digPaths_1.default(floor, floor.blocks);
    floor.blocks = putDownstair_1.default(floor);
    return floor;
});
//# sourceMappingURL=CreateFloor.js.map