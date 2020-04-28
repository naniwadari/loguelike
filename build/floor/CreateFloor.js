"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fillUpWall_1 = __importDefault(require("./usecase/fillUpWall"));
const createRooms_1 = __importDefault(require("./usecase/createRooms"));
const createGates_1 = require("./usecase/createGates");
const digRooms_1 = __importDefault(require("./usecase/digRooms"));
const digPaths_1 = __importDefault(require("./usecase/digPaths"));
const checkDeadEnd_1 = __importDefault(require("./usecase/checkDeadEnd"));
const config_1 = require("../config");
const Floor_1 = require("./Floor");
exports.default = (floorSize) => {
    let rooms = [];
    let gates = [];
    let isConnect = false;
    let blocks = [];
    //部屋の生成
    rooms = createRooms_1.default(config_1.RoomConf.trialNum, floorSize);
    //ゲートポイントの生成
    gates = createGates_1.createGates(rooms);
    //通路が通じるかどうかのチェック
    for (let i = 0; !isConnect; i++) {
        let check = checkDeadEnd_1.default(rooms);
        if (check.result) {
            isConnect = true;
            break;
        }
        else {
            let gate = createGates_1.createGate(check.needPath.to, check.needPath.from);
            gates.push(gate);
        }
    }
    //通じたらフロアインスタンスを生成してブロック情報を変える
    console.log(gates);
    let floor = new Floor_1.Floor(floorSize, rooms, gates);
    blocks = fillUpWall_1.default(floor, blocks);
    blocks = digRooms_1.default(floor, blocks);
    blocks = digPaths_1.default(floor, blocks);
    return blocks;
};
