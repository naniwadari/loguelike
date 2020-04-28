"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const digPass_1 = require("./digPass");
var MapType;
(function (MapType) {
    MapType[MapType["wall"] = 0] = "wall";
    MapType[MapType["floor"] = 1] = "floor";
})(MapType = exports.MapType || (exports.MapType = {}));
var Direction;
(function (Direction) {
    Direction[Direction["up"] = 0] = "up";
    Direction[Direction["right"] = 1] = "right";
    Direction[Direction["bottom"] = 2] = "bottom";
    Direction[Direction["left"] = 3] = "left";
})(Direction = exports.Direction || (exports.Direction = {}));
//フロア内のブロック情報[x][y]で保存
exports.blocks = [];
//フロアのサイズ
const floorSize = { width: 25, height: 25 };
//一部屋あたりの最大サイズ
const maxRoomSize = { width: 10, height: 5 };
//一部屋あたりの最小サイズ
const minRoomSize = { width: 5, height: 5 };
//部屋の生成を試みる回数
const roomCreateCount = 30;
//生成された部屋を格納する配列
exports.rooms = [];
let paths = [];
function createFloor() {
    paths = [];
    exports.blocks = [];
    exports.rooms = [];
    initFloor();
    roomCreator(roomCreateCount);
    // testCaseFloor();
    connectRoomsToPath(exports.rooms);
    console.log(exports.rooms);
    let checked = {
        result: false,
        needConnect: undefined,
    };
    for (let i = 0; !checked.result && i < 4; i++) {
        checked = checkDeadEnd(exports.rooms);
        console.log(checked);
        if (checked.needConnect) {
            DigPass(checked.needConnect.to, checked.needConnect.from);
        }
    }
    return exports.blocks;
}
exports.createFloor = createFloor;
function visualMapping(blocks) {
    for (let i = 0; i < blocks.length; i++) {
        console.log(blocks[i]);
    }
}
function testCaseFloor() {
    let size = { width: 5, height: 5 };
    let point = [
        { x: 16, y: 19 },
        { x: 17, y: 10 },
        { x: 19, y: 2 },
        { x: 2, y: 6 },
        { x: 2, y: 15 },
    ];
    for (let i = 0; i < point.length; i++) {
        createRoom(point[i], size);
        let newRoom = {
            index: i,
            size: size,
            point: point[i],
            hasPath: [],
        };
        exports.rooms.push(newRoom);
    }
}
exports.testCaseFloor = testCaseFloor;
//指定の回数部屋を作成する
function roomCreator(lim) {
    let count = 0;
    for (let i = 0; i < lim; i++) {
        const roomSize = randomRoomSize();
        const startPoint = randomRoomStartPoint();
        const roomElement = createRoom(startPoint, roomSize);
        if (roomElement) {
            const newRoom = {
                index: count,
                size: roomElement.size,
                point: roomElement.point,
                hasPath: [],
            };
            count++;
            exports.rooms.push(newRoom);
        }
    }
}
function connectRoomsToPath(rooms) {
    const tmpRooms = rooms.slice();
    for (let i = 0; i < rooms.length; i++) {
        const room = rooms[i];
        const nearRoom = findNearRoom(room, tmpRooms);
        if (nearRoom) {
            DigPass(room, nearRoom);
            room.toPath = nearRoom.index;
            rooms[nearRoom.index].hasPath.push(room.index);
            tmpRooms.some((v, i) => {
                if (v.index === nearRoom.index)
                    tmpRooms.splice(i, 1);
            });
        }
        else {
            DigPass(room, rooms[0]);
            room.toPath = rooms[0].index;
            rooms[0].hasPath.push(room.index);
        }
    }
    // console.log("-----------------");
}
function checkDeadEnd(rooms) {
    const noCheckedRooms = rooms.slice();
    let next = 0;
    let isConnect = false;
    let needConnect = {
        to: undefined,
        from: undefined,
    };
    for (let i = 0; noCheckedRooms.length > 0; i++) {
        console.log(`----${i}回目のチェック開始-----`);
        //初回の処理
        if (i === 0) {
            let now = rooms[0];
            if (now.toPath)
                next = now.toPath;
            noCheckedRooms.shift();
            let result = noCheckedRooms.some((v) => {
                if (v.index === next)
                    return true;
                else
                    return undefined;
            });
            if (!result) {
                isConnect = true;
                break;
            }
        }
        //2回目以降の処理
        else {
            let now = rooms[next];
            noCheckedRooms.some((v, i) => {
                if (v.index === now.index)
                    noCheckedRooms.splice(i, 1);
            });
            if (now.toPath)
                next = now.toPath;
            let result = noCheckedRooms.some((v) => {
                if (v.index === next)
                    return true;
                else
                    return undefined;
            });
            console.log(`${i}回目のresult`);
            console.log(result);
            if (!result) {
                needConnect = { to: now, from: noCheckedRooms[0] };
                break;
            }
            console.log(`noCheckedRoomsの中身`);
            console.log(noCheckedRooms);
        }
    }
    if (isConnect) {
        console.log("最終結果 true");
        return { result: isConnect, needConnect: undefined };
    }
    else {
        if (needConnect.from && needConnect.to) {
            console.log("チェック結果 false");
            console.log("needConnectの中身");
            console.log(needConnect);
            return { result: isConnect, needConnect: needConnect };
        }
        else {
            needConnect = { to: needConnect.to, from: rooms[0] };
            return { result: isConnect, needConnect: needConnect };
        }
    }
}
//通路の始点をランダムに決める
function randomMakePointToDig(room, direction) {
    const edge = roomEdgeCulculator(room);
    let min;
    let max;
    let result;
    let digPoint = { x: 0, y: 0 };
    //方角毎に通路の始点をランダムに決める
    if (direction === Direction.left) {
        min = edge.upperLeft.y;
        max = edge.bottomLeft.y;
        result = rangeRandomInteger(min, max);
        digPoint = { x: edge.upperLeft.x, y: result };
    }
    else if (direction === Direction.right) {
        min = edge.upperRight.y;
        max = edge.bottomRight.y;
        result = rangeRandomInteger(min, max);
        digPoint = { x: edge.upperRight.x, y: result };
    }
    else if (direction === Direction.up) {
        min = edge.upperLeft.x;
        max = edge.bottomRight.x;
        result = rangeRandomInteger(min, max);
        digPoint = { x: result, y: edge.upperLeft.y };
    }
    else if (direction === Direction.bottom) {
        min = edge.bottomLeft.x;
        max = edge.bottomRight.x;
        result = rangeRandomInteger(min, max);
        digPoint = { x: result, y: edge.bottomLeft.y };
    }
    return digPoint;
}
//指定範囲内の整数をランダムに返す
function rangeRandomInteger(min, max) {
    const result = Math.floor(Math.random() * (max - min) + min);
    return result;
}
//通路を掘る
function DigPass(room, target) {
    const roomEdge = roomEdgeCulculator(room);
    const targetEdge = roomEdgeCulculator(target);
    const digDirection = findDirection(roomEdge, targetEdge);
    let A;
    let B;
    //掘る方向が左右
    if (digDirection === Direction.left) {
        A = randomMakePointToDig(room, Direction.left);
        B = randomMakePointToDig(target, Direction.right);
        digPass_1.Dig.sideToside(A, B);
    }
    else if (digDirection === Direction.right) {
        A = randomMakePointToDig(room, Direction.right);
        B = randomMakePointToDig(target, Direction.left);
        digPass_1.Dig.sideToside(A, B);
    }
    //掘る方向が上下
    else if (digDirection === Direction.up) {
        A = randomMakePointToDig(room, Direction.up);
        B = randomMakePointToDig(target, Direction.bottom);
        digPass_1.Dig.topTobottom(A, B);
    }
    else if (digDirection === Direction.bottom) {
        A = randomMakePointToDig(room, Direction.bottom);
        B = randomMakePointToDig(target, Direction.up);
        digPass_1.Dig.topTobottom(A, B);
    }
    else {
        console.log("undefiend direction error");
        return;
    }
}
//指定した部屋との上下左右の距離の差を比較して最も小さいものを返す
function findDirection(room, target) {
    let distances = [];
    distances.push({
        direction: Direction.left,
        distance: Math.abs(room.upperLeft.x - target.upperRight.x),
    });
    distances.push({
        direction: Direction.right,
        distance: Math.abs(room.upperRight.x - target.upperLeft.x),
    });
    distances.push({
        direction: Direction.up,
        distance: Math.abs(room.upperLeft.y - target.bottomLeft.y),
    });
    distances.push({
        direction: Direction.bottom,
        distance: Math.abs(room.bottomLeft.y - target.upperLeft.y),
    });
    distances.sort((a, b) => {
        return a.distance > b.distance ? 1 : -1;
    });
    const result = distances[0];
    return result.direction;
}
//指定の部屋から一番近い部屋を見つけて返す、一部屋しか無い場合はundfinedを返す。
function findNearRoom(room, rooms) {
    const center = roomEdgeCulculator(room).center;
    let roomDistances = [];
    //一部屋なら早期リターン
    if (rooms.length === 1) {
        return undefined;
    }
    for (let i = 0; i < rooms.length; i++) {
        const anotherCenter = roomEdgeCulculator(rooms[i]).center;
        const distance = Math.abs(center.x - anotherCenter.x) +
            Math.abs(center.y - anotherCenter.y);
        const result = { index: i, distance: distance };
        roomDistances.push(result);
    }
    //部屋の距離を比較して配列を並び替える
    roomDistances = roomDistances.sort((a, b) => {
        return a.distance > b.distance ? 1 : -1;
    });
    //一番近い部屋をして返す
    const nearRoom = rooms[roomDistances[1].index];
    return nearRoom;
}
//部屋の上下左右の角と中心の座標を計算して返す
function roomEdgeCulculator(room) {
    const upperLeft = room.point;
    const upperRight = {
        x: room.point.x + room.size.width - 1,
        y: room.point.y,
    };
    const bottomLeft = {
        x: room.point.x,
        y: room.point.y + room.size.height - 1,
    };
    const bottomRight = {
        x: room.point.x + room.size.width - 1,
        y: room.point.y + room.size.height - 1,
    };
    const center = {
        x: Math.floor(room.point.x + room.size.width / 2),
        y: Math.floor(room.point.y + room.size.height / 2),
    };
    const result = {
        upperLeft: upperLeft,
        upperRight: upperRight,
        bottomLeft: bottomLeft,
        bottomRight: bottomRight,
        center: center,
    };
    return result;
}
//ランダムに部屋のwidthとheightを返す
function randomRoomSize() {
    const width = Math.floor(Math.random() * (maxRoomSize.width - minRoomSize.width + 1)) +
        minRoomSize.width;
    const height = Math.floor(Math.random() * (maxRoomSize.height - minRoomSize.height + 1)) +
        minRoomSize.height;
    const size = { width: width, height: height };
    return size;
}
//ランダムに部屋の左上の座標を返す
function randomRoomStartPoint() {
    //ランダムで座標を生成
    const x = Math.floor(Math.random() * floorSize.width);
    const y = Math.floor(Math.random() * floorSize.height);
    const startPoint = { x: x, y: y };
    return startPoint;
}
function initFloor() {
    for (let i = 0; i <= floorSize.width; i++) {
        exports.blocks[i] = [];
        for (let j = 0; j <= floorSize.height; j++) {
            exports.blocks[i][j] = { base: MapType.wall };
        }
    }
}
//左上の座標と、部屋のサイズにしたがってフロアのタイプ番号を書き換える
function createRoom(startPoint, roomSize) {
    const isAreaNoRoom = checkAreaNoRoom(startPoint, roomSize);
    const isInsideFloor = checkInsideFloor(startPoint, roomSize);
    let result = null;
    //フロアをはみ出してしまう場合処理を中断する
    if (!isInsideFloor) {
        return null;
    }
    //予定地にすでに部屋があった場合処理を中断する。
    else if (!isAreaNoRoom) {
        return null;
    }
    //ブロック情報の書き換え処理
    for (let i = 0; i <= floorSize.width; i++) {
        for (let j = 0; j <= floorSize.height; j++) {
            if (i >= startPoint.x &&
                i < startPoint.x + roomSize.width &&
                j >= startPoint.y &&
                j < startPoint.y + roomSize.height) {
                exports.blocks[i][j].base = MapType.floor;
            }
        }
    }
    result = { point: startPoint, size: roomSize };
    return result;
}
//作成しようとしている部屋がフロアからはみだしていないか確認する
function checkInsideFloor(startPoint, roomSize) {
    let result = true;
    const endPoint = {
        x: startPoint.x + roomSize.width,
        y: startPoint.y + roomSize.height,
    };
    //部屋がフロアからはみ出していないか確認
    if (startPoint.x < 1 ||
        startPoint.y < 1 ||
        endPoint.x > floorSize.width - 1 ||
        endPoint.y > floorSize.height - 1) {
        //はみ出していたらfalseを返す
        result = false;
    }
    return result;
}
//作成しようとしている部屋のエリア内に、すでに部屋がないか確認する。
function checkAreaNoRoom(startPoint, roomSize) {
    let result = true;
    for (let i = 0; i <= floorSize.width; i++) {
        for (let j = 0; j <= floorSize.height; j++) {
            if (
            //部屋の予定座標と、その周囲１マスにすでに部屋がないか確認
            i >= startPoint.x - 3 &&
                i < startPoint.x + roomSize.width + 3 &&
                j >= startPoint.y - 3 &&
                j < startPoint.y + roomSize.height + 3) {
                if (exports.blocks[i][j].base === MapType.floor) {
                    result = false;
                    break;
                }
            }
        }
    }
    return result;
}
