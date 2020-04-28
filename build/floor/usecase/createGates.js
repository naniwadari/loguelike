"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../../config");
var Random_1 = require("../../module/Random");
function createGates(rooms) {
    var tmpRooms = rooms.slice();
    var paths = [];
    var _loop_1 = function (i) {
        var room = rooms[i];
        var nearRoom = room.findNear(tmpRooms);
        if (nearRoom && room.index && nearRoom.index) {
            var path = createGate(room, nearRoom);
            if (path) {
                paths.push(path);
                room.toPath.push(nearRoom.index);
                nearRoom.hasPath.push(room.index);
                tmpRooms.some(function (v, i) {
                    if (v.index === nearRoom.index)
                        tmpRooms.splice(i, 1);
                });
            }
        }
        else if (room) {
            var path = createGate(room, rooms[0]);
            if (path && rooms[0].index && room.index) {
                paths.push(path);
                room.toPath.push(rooms[0].index);
                rooms[0].hasPath.push(room.index);
            }
        }
    };
    for (var i = 0; i < rooms.length; i++) {
        _loop_1(i);
    }
    return paths;
}
exports.createGates = createGates;
//パスを作る起点となるドアを決定する
function createGate(room, target) {
    var direction = findDirection(room, target);
    var A;
    var B;
    //掘る方向が左右
    if (direction === config_1.Direction.left) {
        A = randomGate(room, config_1.Direction.left);
        B = randomGate(target, config_1.Direction.right);
        var path = { A: A, B: B, direction: config_1.Direction.left };
        return path;
    }
    else if (direction === config_1.Direction.right) {
        A = randomGate(room, config_1.Direction.right);
        B = randomGate(target, config_1.Direction.left);
        var path = { A: A, B: B, direction: config_1.Direction.right };
        return path;
    }
    //掘る方向が上下
    else if (direction === config_1.Direction.top) {
        A = randomGate(room, config_1.Direction.top);
        B = randomGate(target, config_1.Direction.bottom);
        var path = { A: A, B: B, direction: config_1.Direction.top };
        return path;
    }
    else {
        A = randomGate(room, config_1.Direction.bottom);
        B = randomGate(target, config_1.Direction.top);
        var path = { A: A, B: B, direction: config_1.Direction.bottom };
        return path;
    }
}
exports.createGate = createGate;
//指定した部屋との上下左右の距離の差を比較して最も小さいものを返す
function findDirection(room, target) {
    var distances = [];
    distances.push({
        direction: config_1.Direction.left,
        distance: Math.abs(room.start.x - target.end.x),
    });
    distances.push({
        direction: config_1.Direction.right,
        distance: Math.abs(room.end.x - target.start.x),
    });
    distances.push({
        direction: config_1.Direction.top,
        distance: Math.abs(room.start.y - target.end.y),
    });
    distances.push({
        direction: config_1.Direction.bottom,
        distance: Math.abs(room.end.y - target.start.y),
    });
    distances.sort(function (a, b) {
        return a.distance > b.distance ? 1 : -1;
    });
    var result = distances[0];
    return result.direction;
}
//通路の始点をランダムに決める
function randomGate(room, direction) {
    var gate = { x: 0, y: 0 };
    //方角毎に通路の始点をランダムに決める
    if (direction === config_1.Direction.left) {
        gate = { x: room.start.x, y: Random_1.Random.rangeInt(room.start.y, room.end.y) };
    }
    else if (direction === config_1.Direction.right) {
        gate = { x: room.end.x, y: Random_1.Random.rangeInt(room.start.y, room.end.y) };
    }
    else if (direction === config_1.Direction.top) {
        gate = { x: Random_1.Random.rangeInt(room.start.x, room.end.x), y: room.start.y };
    }
    else if (direction === config_1.Direction.bottom) {
        gate = { x: Random_1.Random.rangeInt(room.start.x, room.end.x), y: room.end.y };
    }
    return gate;
}
