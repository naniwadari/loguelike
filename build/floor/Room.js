"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var Room = /** @class */ (function () {
    function Room(point, size, index) {
        if (index) {
            this.index = index;
        }
        this.size = size;
        this.start = point;
        this.end = this.calcEnd(point, size);
        this.center = this.calcCenter(point, size);
        this.hasPath = [];
        this.toPath = [];
    }
    //終点を計算
    Room.prototype.calcEnd = function (point, size) {
        var result = {
            x: point.x + size.width - 1,
            y: point.y + size.height - 1,
        };
        return result;
    };
    //中心点を計算
    Room.prototype.calcCenter = function (point, size) {
        var result = {
            x: Math.floor(point.x + size.width / 2),
            y: Math.floor(point.y + size.height / 2),
        };
        return result;
    };
    //与えられた座標が部屋の中にあるか判断する
    Room.prototype.isInRoom = function (point) {
        var isIn = false;
        if (point.x <= this.end.x &&
            point.x >= this.start.x &&
            point.y <= this.end.y &&
            point.y >= this.start.x) {
            isIn = true;
        }
        return isIn;
    };
    Room.prototype.isNoDuplicate = function (rooms) {
        var result = false;
        var area_x = {
            start: this.start.x - config_1.RoomConf.distance_x,
            end: this.end.x + config_1.RoomConf.distance_x,
        };
        var area_y = {
            start: this.start.y - config_1.RoomConf.distance_y,
            end: this.end.y + config_1.RoomConf.distance_y,
        };
        //まだ部屋が無い場合、確実に生成できるので処理終了
        if (rooms.length === 0) {
            result = true;
            return result;
        }
        //各部屋のxとyを比較する
        for (var i = 0; i < rooms.length; i++) {
            var room = rooms[i];
            if (area_x.start > room.end.x ||
                area_x.end < room.start.x ||
                area_y.start > room.end.y ||
                area_y.end < room.start.y) {
                result = true;
            }
            else {
                result = false;
                break;
            }
        }
        return result;
    };
    //作成しようとしている部屋がフロアからはみだしていないか確認する
    Room.prototype.isInFloor = function (floorSize) {
        var result = true;
        //部屋がフロアからはみ出していないか確認
        if (this.start.x < 1 ||
            this.start.y < 1 ||
            this.end.x > floorSize.width - 2 ||
            this.end.y > floorSize.height - 2) {
            result = false;
        }
        return result;
    };
    return Room;
}());
exports.default = Room;
//# sourceMappingURL=Room.js.map