"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Type;
(function (Type) {
    Type[Type["wall"] = 0] = "wall";
    Type[Type["floor"] = 1] = "floor";
})(Type || (Type = {}));
var blocks = [];
var floorSize = { width: 5, height: 5 };
var maxRoomSize = { width: 3, height: 3 };
var minRoomSize = { width: 1, height: 1 };
var roomCreateCount = 50;
initFroor();
// createRoom({ x: 0, y: 0 }, { width: 2, height: 2 });
// //失敗するべき
// createRoom({ x: 0, y: 0 }, { width: 2, height: 2 });
// //成功するべき
// createRoom({ x: 3, y: 3 }, { width: 2, height: 2 });
roomCreator(roomCreateCount);
console.log(visualMapping(blocks));
function visualMapping(blocks) {
    for (var i = 0; i < blocks.length; i++) {
        console.log(blocks[i]);
    }
}
function roomCreator(lim) {
    for (var i = 0; i < lim; i++) {
        var roomSize = randomRoomSize();
        // console.log(roomSize);
        var startPoint = randomRoomStartPoint();
        createRoom(startPoint, roomSize);
    }
}
function randomRoomSize() {
    var width = Math.floor(Math.random() * (maxRoomSize.width - minRoomSize.width + 1)) +
        minRoomSize.width;
    var height = Math.floor(Math.random() * (maxRoomSize.height - minRoomSize.height + 1)) +
        minRoomSize.height;
    var size = { width: width, height: height };
    return size;
}
function randomRoomStartPoint() {
    //ランダムで座標を生成
    var x = Math.floor(Math.random() * floorSize.width);
    var y = Math.floor(Math.random() * floorSize.height);
    var point = { x: x, y: y };
    return point;
}
function initFroor() {
    for (var i = 0; i <= floorSize.width; i++) {
        blocks[i] = [];
        for (var j = 0; j <= floorSize.height; j++) {
            blocks[i][j] = Type.wall;
        }
    }
}
function createRoom(startPoint, roomSize) {
    var isAreaNoRoom = checkAreaNoRoom(startPoint, roomSize);
    var isInsideFloor = checkInsideFloor(startPoint, roomSize);
    //予定地にすでに部屋があった場合処理を中断する。
    if (!isAreaNoRoom) {
        // console.log("すでに部屋があります。処理終了。");
        return;
    }
    //フロアがはみ出してしまう場合処理を中断する
    else if (!isInsideFloor) {
        // console.log("部屋がはみ出しています。処理終了");
        return;
    }
    //ブロック情報の書き換え処理
    for (var i = 0; i <= floorSize.width; i++) {
        for (var j = 0; j <= floorSize.height; j++) {
            if (i >= startPoint.x &&
                i < startPoint.x + roomSize.width &&
                j >= startPoint.y &&
                j < startPoint.y + roomSize.height) {
                blocks[i][j] = Type.floor;
            }
        }
    }
    console.log("ルームを生成できました");
}
function checkInsideFloor(startPoint, roomSize) {
    var result = true;
    var endPoint = {
        x: startPoint.x + roomSize.width,
        y: startPoint.y + roomSize.height,
    };
    //部屋がフロアからはみ出していないか確認
    if (endPoint.x > floorSize.width || endPoint.y > floorSize.width) {
        //はみ出していたらfalseを返す
        result = false;
    }
    return result;
}
function checkAreaNoRoom(startPoint, roomSize) {
    var result = true;
    for (var i = 0; i <= floorSize.width; i++) {
        for (var j = 0; j <= floorSize.height; j++) {
            if (
            //部屋の予定座標と、その周囲１マスにすでに部屋がないか確認
            i >= startPoint.x - 1 &&
                i < startPoint.x + roomSize.width + 1 &&
                j >= startPoint.y - 1 &&
                j < startPoint.y + roomSize.height + 1) {
                if (blocks[i][j] === Type.floor) {
                    result = false;
                    break;
                }
            }
        }
    }
    return result;
}
