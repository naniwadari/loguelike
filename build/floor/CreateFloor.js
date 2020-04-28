"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fillUpWall_1 = __importDefault(require("./usecase/fillUpWall"));
var createRooms_1 = __importDefault(require("./usecase/createRooms"));
var createGates_1 = require("./usecase/createGates");
var digRooms_1 = __importDefault(require("./usecase/digRooms"));
var digPaths_1 = __importDefault(require("./usecase/digPaths"));
var checkDeadEnd_1 = __importDefault(require("./usecase/checkDeadEnd"));
var config_1 = require("../config");
var Floor_1 = require("./Floor");
exports.default = (function (floorSize) {
    var rooms = [];
    var gates = [];
    var isConnect = false;
    var blocks = [];
    //部屋の生成
    rooms = createRooms_1.default(config_1.RoomConf.trialNum, floorSize);
    //ゲートポイントの生成
    gates = createGates_1.createGates(rooms);
    //通路が通じるかどうかのチェック
    for (var i = 0; !isConnect; i++) {
        var check = checkDeadEnd_1.default(rooms);
        if (check.result) {
            isConnect = true;
            break;
        }
        else {
            var gate = createGates_1.createGate(check.needPath.to, check.needPath.from);
            gates.push(gate);
        }
    }
    //通じたらフロアインスタンスを生成してブロック情報を変える
    var floor = new Floor_1.Floor(floorSize, rooms, gates);
    blocks = fillUpWall_1.default(floor, blocks);
    blocks = digRooms_1.default(floor, blocks);
    blocks = digPaths_1.default(floor, blocks);
    return blocks;
});
