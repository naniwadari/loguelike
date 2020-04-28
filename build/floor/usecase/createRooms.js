"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../../config");
var random_1 = require("../../module/random");
var Room_1 = __importDefault(require("../Room"));
//条件にあった部屋を作り出して配列を返す
exports.default = (function (lim, floorSize) {
    var rooms = [];
    var successCount = 0;
    for (var i = 0; i < lim; i++) {
        var size = randomRoomSize();
        var startPoint = randomRoomStartPoint(floorSize);
        var newRoom = new Room_1.default(startPoint, size);
        if (newRoom.isNoDuplicate(rooms) && newRoom.isInFloor(floorSize)) {
            newRoom.index = successCount;
            successCount++;
            rooms.push(newRoom);
        }
    }
    return rooms;
});
//ランダムに部屋のサイズを返す
function randomRoomSize() {
    var width = random_1.Random.rangeInt(config_1.RoomConf.minWidth, config_1.RoomConf.maxWidth);
    var height = random_1.Random.rangeInt(config_1.RoomConf.minHeight, config_1.RoomConf.maxHeight);
    var size = { width: width, height: height };
    return size;
}
//ランダムに部屋の左上の座標を返す
function randomRoomStartPoint(floorSize) {
    //ランダムで座標を生成
    var x = random_1.Random.rangeInt(1, floorSize.width);
    var y = random_1.Random.rangeInt(1, floorSize.height);
    var point = { x: x, y: y };
    return point;
}
