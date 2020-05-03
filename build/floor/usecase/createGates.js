"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../../config");
var RandomNum_1 = require("../../module/RandomNum");
var RoomSearch_1 = require("../../module/RoomSearch");
function createGates(rooms) {
    var tmpRooms = rooms.slice();
    var gates = [];
    for (var i = 0; i < rooms.length || i < 100; i++) {
        var room = rooms[i];
        var nearRoom = findNearRoom(room, tmpRooms);
        if (nearRoom) {
            var gate = createGate(room, nearRoom);
            gates.push(gate);
            if (nearRoom.index)
                room.toPath.push(nearRoom.index);
            if (room.index)
                nearRoom.hasPath.push(room.index);
            RoomSearch_1.RoomSearch.remove(tmpRooms, room);
            rooms = RoomSearch_1.RoomSearch.update(rooms, room);
            rooms = RoomSearch_1.RoomSearch.update(rooms, nearRoom);
        }
        else {
            var targetIndex = RandomNum_1.Random.rangeInt(0, rooms.length - 1);
            var target = RoomSearch_1.RoomSearch.byIndex(rooms, targetIndex);
            if (room && target) {
                if (target.index)
                    room.toPath.push(target.index);
                if (room.index)
                    target.hasPath.push(room.index);
                RoomSearch_1.RoomSearch.remove(tmpRooms, room);
                rooms = RoomSearch_1.RoomSearch.update(rooms, room);
                rooms = RoomSearch_1.RoomSearch.update(rooms, target);
            }
        }
    }
    return { rooms: rooms, gates: gates };
}
exports.createGates = createGates;
function findNearRoom(room, rooms) {
    var roomDistances = [];
    if (rooms.length <= 1) {
        return undefined;
    }
    for (var i = 0; i < rooms.length; i++) {
        var target = rooms[i];
        var distance = Math.abs(room.center.x - target.center.x) +
            Math.abs(room.center.y - target.center.y);
        //距離ゼロは自室なので加えない
        if (distance !== 0) {
            var result = { index: i, distance: distance };
            roomDistances.push(result);
        }
    }
    //部屋の距離を比較して配列を並び替える
    roomDistances = roomDistances.sort(function (a, b) {
        return a.distance > b.distance ? 1 : -1;
    });
    //一番近い部屋を返す
    return rooms[roomDistances[0].index];
}
exports.findNearRoom = findNearRoom;
//パスを作る起点となるドアを決定する
function createGate(room, target) {
    var direction = findDireciton(room, target);
    var A;
    var B;
    //掘る方向が左右
    if (direction === config_1.Direction.left) {
        A = randomGate(room, config_1.Direction.left);
        B = randomGate(target, config_1.Direction.right);
        var gate = { A: A, B: B, direction: config_1.Direction.left };
        return gate;
    }
    else if (direction === config_1.Direction.right) {
        A = randomGate(room, config_1.Direction.right);
        B = randomGate(target, config_1.Direction.left);
        var gate = { A: A, B: B, direction: config_1.Direction.right };
        return gate;
    }
    //掘る方向が上下
    else if (direction === config_1.Direction.top) {
        A = randomGate(room, config_1.Direction.top);
        B = randomGate(target, config_1.Direction.bottom);
        var gate = { A: A, B: B, direction: config_1.Direction.top };
        return gate;
    }
    else {
        A = randomGate(room, config_1.Direction.bottom);
        B = randomGate(target, config_1.Direction.top);
        var gate = { A: A, B: B, direction: config_1.Direction.bottom };
        return gate;
    }
}
exports.createGate = createGate;
//指定した部屋との上下左右の距離の差を比較して最も小さいものを返す
function findDireciton(room, target) {
    if (target.center.x <= room.start.x && target.center.y <= room.end.y) {
        return config_1.Direction.left;
    }
    else if (target.center.x <= room.end.x && target.center.y >= room.end.y) {
        return config_1.Direction.bottom;
    }
    else if (target.center.x >= room.end.x && target.center.y >= room.start.y) {
        return config_1.Direction.right;
    }
    else if (target.center.x >= room.start.x &&
        target.center.y <= room.start.y) {
        return config_1.Direction.top;
    }
    else {
        return config_1.Direction.top;
    }
}
exports.findDireciton = findDireciton;
//通路の始点をランダムに決める
function randomGate(room, direction) {
    var gate = { x: 0, y: 0 };
    //方角毎に通路の始点をランダムに決める
    if (direction === config_1.Direction.left) {
        gate = { x: room.start.x, y: RandomNum_1.Random.rangeInt(room.start.y, room.end.y) };
    }
    else if (direction === config_1.Direction.right) {
        gate = { x: room.end.x, y: RandomNum_1.Random.rangeInt(room.start.y, room.end.y) };
    }
    else if (direction === config_1.Direction.top) {
        gate = { x: RandomNum_1.Random.rangeInt(room.start.x, room.end.x), y: room.start.y };
    }
    else if (direction === config_1.Direction.bottom) {
        gate = { x: RandomNum_1.Random.rangeInt(room.start.x, room.end.x), y: room.end.y };
    }
    return gate;
}
exports.randomGate = randomGate;
//# sourceMappingURL=createGates.js.map