"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const RandomNum_1 = require("../../module/RandomNum");
function createGates(rooms) {
    const tmpRooms = rooms.slice();
    let gates = [];
    for (let i = 0; i < rooms.length || i < 100; i++) {
        const room = rooms[i];
        const nearRoom = room.findNear(tmpRooms);
        if (nearRoom) {
            const path = createGate(room, nearRoom);
            if (path) {
                gates.push(path);
                if (nearRoom.index)
                    room.toPath.push(nearRoom.index);
                if (room.index)
                    nearRoom.hasPath.push(room.index);
                tmpRooms.some((v, i) => {
                    if (v.index === nearRoom.index)
                        tmpRooms.splice(i, 1);
                });
            }
        }
        else if (room) {
            const path = createGate(room, rooms[0]);
            if (path) {
                gates.push(path);
                if (rooms[0].index)
                    room.toPath.push(rooms[0].index);
                if (room.index)
                    rooms[0].hasPath.push(room.index);
            }
        }
    }
    return gates;
}
exports.createGates = createGates;
//パスを作る起点となるドアを決定する
function createGate(room, target) {
    const direction = findDirection(room, target);
    let A;
    let B;
    //掘る方向が左右
    if (direction === config_1.Direction.left) {
        A = randomGate(room, config_1.Direction.left);
        B = randomGate(target, config_1.Direction.right);
        let path = { A: A, B: B, direction: config_1.Direction.left };
        return path;
    }
    else if (direction === config_1.Direction.right) {
        A = randomGate(room, config_1.Direction.right);
        B = randomGate(target, config_1.Direction.left);
        let path = { A: A, B: B, direction: config_1.Direction.right };
        return path;
    }
    //掘る方向が上下
    else if (direction === config_1.Direction.top) {
        A = randomGate(room, config_1.Direction.top);
        B = randomGate(target, config_1.Direction.bottom);
        let path = { A: A, B: B, direction: config_1.Direction.top };
        return path;
    }
    else {
        A = randomGate(room, config_1.Direction.bottom);
        B = randomGate(target, config_1.Direction.top);
        let path = { A: A, B: B, direction: config_1.Direction.bottom };
        return path;
    }
}
exports.createGate = createGate;
//指定した部屋との上下左右の距離の差を比較して最も小さいものを返す
function findDirection(room, target) {
    let distances = [];
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
    distances.sort((a, b) => {
        return a.distance > b.distance ? 1 : -1;
    });
    const result = distances[0];
    return result.direction;
}
exports.findDirection = findDirection;
//通路の始点をランダムに決める
function randomGate(room, direction) {
    let gate = { x: 0, y: 0 };
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
