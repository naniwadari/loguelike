"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var minRoomWidth = 6; //偶数
var minRoomHeight = 6; //偶数
function roomWidth(room) {
    return room.end.x - room.start.x;
}
function roomHeight(room) {
    return room.end.y - room.start.y;
}
function splitRoom(blocks, room, splitProb, random) {
    var avoidProb = random.fraction();
    if (avoidProb <= splitProb) {
        var splitDirection = random.num(2);
        //部屋の横(x)の広さが縦(y)の２倍以上あった場合,縦に分割
        if (roomWidth(room) > roomHeight(room) * 2) {
            splitDirection = 0; //縦
        }
        //部屋の縦(y)の広さが横(x)の2倍以上あった場合、横に分割
        else if (roomWidth(room) * 2 < roomHeight(room)) {
            splitDirection = 1; //横
        }
        //縦に分割する場合
        if (splitDirection === 0) {
            // 横の広さが最小値以下ならリターン
            if (roomWidth(room) <= minRoomWidth) {
                return [];
            }
            var XsplitPoint = random.num(roomWidth(room) - minRoomWidth) +
                minRoomWidth / 2 +
                room.start.x;
            if (blocks[XsplitPoint][room.start.y - 1].base !== config_1.MapType.wall) {
                return [];
            }
            if (blocks[XsplitPoint][room.end.y + 1].base !== config_1.MapType.wall) {
                return [];
            }
            var y = random.num(roomHeight(room)) + room.start.y;
            for (var i = room.start.y; i <= room.end.y; i++) {
                if (i !== y) {
                    blocks[XsplitPoint][i].base = config_1.MapType.wall;
                }
            }
            //分割後の部屋１
            var splitRoom1 = {
                start: room.start,
                end: { x: XsplitPoint - 1, y: room.end.y },
            };
            //分割後の部屋２
            var splitRoom2 = {
                start: { x: XsplitPoint + 1, y: room.start.y },
                end: room.end,
            };
            var orderRoomDirection = random.num(2);
            if (orderRoomDirection === 0) {
                return [splitRoom1, splitRoom2];
            }
            else {
                return [splitRoom2, splitRoom1];
            }
        }
        // 横に分割する場合
        else if (splitDirection === 1) {
            if (roomHeight(room) <= minRoomHeight) {
                return [];
            }
            var YsplitPoint = random.num(roomHeight(room) - minRoomHeight) +
                minRoomHeight / 2 +
                room.start.y;
            if (blocks[room.start.x - 1][YsplitPoint].base !== config_1.MapType.wall) {
                return [];
            }
            if (blocks[room.end.x + 1][YsplitPoint].base !== config_1.MapType.wall) {
                return [];
            }
            var XsplitPoint = random.num(roomWidth(room)) + room.start.x;
            for (var i = room.start.x; i <= room.end.x; i++) {
                if (i !== XsplitPoint) {
                    blocks[i][YsplitPoint].base = config_1.MapType.wall;
                }
            }
            var splitRoom1 = {
                start: room.start,
                end: { x: room.end.x, y: YsplitPoint - 1 },
            };
            var splitRoom2 = {
                start: { x: room.start.x, y: YsplitPoint + 1 },
                end: room.end,
            };
            var orderRoomDirection = random.num(2);
            if (orderRoomDirection === 0) {
                return [splitRoom1, splitRoom2];
            }
            else {
                return [splitRoom2, splitRoom1];
            }
        }
    }
    return [];
}
exports.splitRoom = splitRoom;
