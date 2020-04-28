"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const RandomNum_1 = require("../../module/RandomNum");
const Room_1 = __importDefault(require("../Room"));
//条件にあった部屋を作り出して配列を返す
exports.default = (lim, floorSize) => {
    let rooms = [];
    let successCount = 0;
    for (let i = 0; i < lim; i++) {
        const size = randomRoomSize();
        const startPoint = randomRoomStartPoint(floorSize);
        const newRoom = new Room_1.default(startPoint, size);
        if (newRoom.isNoDuplicate(rooms) && newRoom.isInFloor(floorSize)) {
            newRoom.index = successCount;
            successCount++;
            rooms.push(newRoom);
        }
    }
    return rooms;
};
//ランダムに部屋のサイズを返す
function randomRoomSize() {
    const width = RandomNum_1.Random.rangeInt(config_1.RoomConf.minWidth, config_1.RoomConf.maxWidth);
    const height = RandomNum_1.Random.rangeInt(config_1.RoomConf.minHeight, config_1.RoomConf.maxHeight);
    const size = { width: width, height: height };
    return size;
}
//ランダムに部屋の左上の座標を返す
function randomRoomStartPoint(floorSize) {
    //ランダムで座標を生成
    const x = RandomNum_1.Random.rangeInt(1, floorSize.width);
    const y = RandomNum_1.Random.rangeInt(1, floorSize.height);
    const point = { x: x, y: y };
    return point;
}
