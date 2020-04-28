"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var digPass_1 = require("./digPass");
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
var floorSize = { width: 25, height: 25 };
//一部屋あたりの最大サイズ
var maxRoomSize = { width: 10, height: 5 };
//一部屋あたりの最小サイズ
var minRoomSize = { width: 5, height: 5 };
//部屋の生成を試みる回数
var roomCreateCount = 30;
//生成された部屋を格納する配列
exports.rooms = [];
var paths = [];
function createFloor() {
    paths = [];
    exports.blocks = [];
    exports.rooms = [];
    initFloor();
    roomCreator(roomCreateCount);
    // testCaseFloor();
    connectRoomsToPath(exports.rooms);
    console.log(exports.rooms);
    var checked = {
        result: false,
        needConnect: undefined,
    };
    for (var i = 0; !checked.result && i < 4; i++) {
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
    for (var i = 0; i < blocks.length; i++) {
        console.log(blocks[i]);
    }
}
function testCaseFloor() {
    var size = { width: 5, height: 5 };
    var point = [
        { x: 16, y: 19 },
        { x: 17, y: 10 },
        { x: 19, y: 2 },
        { x: 2, y: 6 },
        { x: 2, y: 15 },
    ];
    for (var i = 0; i < point.length; i++) {
        createRoom(point[i], size);
        var newRoom = {
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
    var count = 0;
    for (var i = 0; i < lim; i++) {
        var roomSize = randomRoomSize();
        var startPoint = randomRoomStartPoint();
        var roomElement = createRoom(startPoint, roomSize);
        if (roomElement) {
            var newRoom = {
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
    var tmpRooms = rooms.slice();
    var _loop_1 = function (i) {
        var room = rooms[i];
        var nearRoom = findNearRoom(room, tmpRooms);
        if (nearRoom) {
            DigPass(room, nearRoom);
            room.toPath = nearRoom.index;
            rooms[nearRoom.index].hasPath.push(room.index);
            tmpRooms.some(function (v, i) {
                if (v.index === nearRoom.index)
                    tmpRooms.splice(i, 1);
            });
        }
        else {
            DigPass(room, rooms[0]);
            room.toPath = rooms[0].index;
            rooms[0].hasPath.push(room.index);
        }
    };
    for (var i = 0; i < rooms.length; i++) {
        _loop_1(i);
    }
    // console.log("-----------------");
}
function checkDeadEnd(rooms) {
    var noCheckedRooms = rooms.slice();
    var next = 0;
    var isConnect = false;
    var needConnect = {
        to: undefined,
        from: undefined,
    };
    var _loop_2 = function (i) {
        console.log("----" + i + "\u56DE\u76EE\u306E\u30C1\u30A7\u30C3\u30AF\u958B\u59CB-----");
        //初回の処理
        if (i === 0) {
            var now = rooms[0];
            if (now.toPath)
                next = now.toPath;
            noCheckedRooms.shift();
            var result = noCheckedRooms.some(function (v) {
                if (v.index === next)
                    return true;
                else
                    return undefined;
            });
            if (!result) {
                isConnect = true;
                return "break";
            }
        }
        //2回目以降の処理
        else {
            var now_1 = rooms[next];
            noCheckedRooms.some(function (v, i) {
                if (v.index === now_1.index)
                    noCheckedRooms.splice(i, 1);
            });
            if (now_1.toPath)
                next = now_1.toPath;
            var result = noCheckedRooms.some(function (v) {
                if (v.index === next)
                    return true;
                else
                    return undefined;
            });
            console.log(i + "\u56DE\u76EE\u306Eresult");
            console.log(result);
            if (!result) {
                needConnect = { to: now_1, from: noCheckedRooms[0] };
                return "break";
            }
            console.log("noCheckedRooms\u306E\u4E2D\u8EAB");
            console.log(noCheckedRooms);
        }
    };
    for (var i = 0; noCheckedRooms.length > 0; i++) {
        var state_1 = _loop_2(i);
        if (state_1 === "break")
            break;
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
    var edge = roomEdgeCulculator(room);
    var min;
    var max;
    var result;
    var digPoint = { x: 0, y: 0 };
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
    var result = Math.floor(Math.random() * (max - min) + min);
    return result;
}
//通路を掘る
function DigPass(room, target) {
    var roomEdge = roomEdgeCulculator(room);
    var targetEdge = roomEdgeCulculator(target);
    var digDirection = findDirection(roomEdge, targetEdge);
    var A;
    var B;
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
    var distances = [];
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
    distances.sort(function (a, b) {
        return a.distance > b.distance ? 1 : -1;
    });
    var result = distances[0];
    return result.direction;
}
//指定の部屋から一番近い部屋を見つけて返す、一部屋しか無い場合はundfinedを返す。
function findNearRoom(room, rooms) {
    var center = roomEdgeCulculator(room).center;
    var roomDistances = [];
    //一部屋なら早期リターン
    if (rooms.length === 1) {
        return undefined;
    }
    for (var i = 0; i < rooms.length; i++) {
        var anotherCenter = roomEdgeCulculator(rooms[i]).center;
        var distance = Math.abs(center.x - anotherCenter.x) +
            Math.abs(center.y - anotherCenter.y);
        var result = { index: i, distance: distance };
        roomDistances.push(result);
    }
    //部屋の距離を比較して配列を並び替える
    roomDistances = roomDistances.sort(function (a, b) {
        return a.distance > b.distance ? 1 : -1;
    });
    //一番近い部屋をして返す
    var nearRoom = rooms[roomDistances[1].index];
    return nearRoom;
}
//部屋の上下左右の角と中心の座標を計算して返す
function roomEdgeCulculator(room) {
    var upperLeft = room.point;
    var upperRight = {
        x: room.point.x + room.size.width - 1,
        y: room.point.y,
    };
    var bottomLeft = {
        x: room.point.x,
        y: room.point.y + room.size.height - 1,
    };
    var bottomRight = {
        x: room.point.x + room.size.width - 1,
        y: room.point.y + room.size.height - 1,
    };
    var center = {
        x: Math.floor(room.point.x + room.size.width / 2),
        y: Math.floor(room.point.y + room.size.height / 2),
    };
    var result = {
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
    var width = Math.floor(Math.random() * (maxRoomSize.width - minRoomSize.width + 1)) +
        minRoomSize.width;
    var height = Math.floor(Math.random() * (maxRoomSize.height - minRoomSize.height + 1)) +
        minRoomSize.height;
    var size = { width: width, height: height };
    return size;
}
//ランダムに部屋の左上の座標を返す
function randomRoomStartPoint() {
    //ランダムで座標を生成
    var x = Math.floor(Math.random() * floorSize.width);
    var y = Math.floor(Math.random() * floorSize.height);
    var startPoint = { x: x, y: y };
    return startPoint;
}
function initFloor() {
    for (var i = 0; i <= floorSize.width; i++) {
        exports.blocks[i] = [];
        for (var j = 0; j <= floorSize.height; j++) {
            exports.blocks[i][j] = { base: MapType.wall };
        }
    }
}
//左上の座標と、部屋のサイズにしたがってフロアのタイプ番号を書き換える
function createRoom(startPoint, roomSize) {
    var isAreaNoRoom = checkAreaNoRoom(startPoint, roomSize);
    var isInsideFloor = checkInsideFloor(startPoint, roomSize);
    var result = null;
    //フロアをはみ出してしまう場合処理を中断する
    if (!isInsideFloor) {
        return null;
    }
    //予定地にすでに部屋があった場合処理を中断する。
    else if (!isAreaNoRoom) {
        return null;
    }
    //ブロック情報の書き換え処理
    for (var i = 0; i <= floorSize.width; i++) {
        for (var j = 0; j <= floorSize.height; j++) {
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
    var result = true;
    var endPoint = {
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
    var result = true;
    for (var i = 0; i <= floorSize.width; i++) {
        for (var j = 0; j <= floorSize.height; j++) {
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
