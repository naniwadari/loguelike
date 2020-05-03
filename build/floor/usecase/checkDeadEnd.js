"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoomSearch_1 = require("../../module/RoomSearch");
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
            RoomSearch_1.RoomSearch.remove(noCheckedRooms, now);
            next = RoomSearch_1.RoomSearch.connectTo(noCheckedRooms, now);
        }
        else {
            var now = next;
            RoomSearch_1.RoomSearch.remove(noCheckedRooms, now);
            next = RoomSearch_1.RoomSearch.connectTo(noCheckedRooms, now);
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
//# sourceMappingURL=checkDeadEnd.js.map