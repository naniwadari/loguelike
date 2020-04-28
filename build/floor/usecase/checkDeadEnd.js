"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (rooms) {
    var noCheckedRooms = rooms.slice();
    var isConnect = false;
    var needPath = { to: rooms[0], from: rooms[0] };
    //部屋が一部屋のみの場合はパスの必要が無いので早期リターン
    if (rooms.length === 1) {
        isConnect = true;
        return { result: isConnect, needPath: needPath };
    }
    for (var i = 0; noCheckedRooms.length > 0; i++) {
        var next = rooms[0];
        var needPath_1 = void 0;
        if (i === 0) {
            var now = rooms[0];
            removeRoom(noCheckedRooms, now);
            next = findNextRoom(noCheckedRooms, now);
        }
        else {
            var now = next;
            removeRoom(noCheckedRooms, now);
            next = findNextRoom(noCheckedRooms, now);
            if (!next) {
                needPath_1 = { to: now, from: noCheckedRooms[0] };
                break;
            }
        }
        isConnect = true;
    }
    if (isConnect) {
        return { result: isConnect, needPath: needPath };
    }
    else {
        return { result: isConnect, needPath: needPath };
    }
});
//該当する部屋があれば配列から削除する
function removeRoom(rooms, room) {
    rooms.some(function (v, i) {
        if (v.index === room.index)
            rooms.splice(i, 1);
    });
}
// 次の部屋を検索する
function findNextRoom(rooms, now) {
    var nextIndex = now.toPath[now.toPath.length - 1];
    var result = findRoomByIndex(rooms, nextIndex);
    return result;
}
//次の部屋をインデックスで検索する
function findRoomByIndex(rooms, index) {
    var result = rooms.filter(function (room) {
        return room.index === index;
    });
    return result[0];
}
function findRoom(rooms, room) {
    var isFind;
    isFind = rooms.some(function (v, i) {
        if (v.index === room.index)
            return true;
        else
            return false;
    });
    return isFind;
}
