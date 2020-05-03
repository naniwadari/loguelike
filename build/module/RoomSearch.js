"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoomSearch;
(function (RoomSearch) {
    //該当する部屋があれば配列から削除する
    function remove(rooms, room) {
        rooms.some(function (v, i) {
            if (v.index === room.index)
                rooms.splice(i, 1);
        });
    }
    RoomSearch.remove = remove;
    function update(rooms, room) {
        rooms.some(function (v, i) {
            if (v.index === room.index)
                rooms[i] = room;
        });
        return rooms;
    }
    RoomSearch.update = update;
    // 次の部屋を検索する
    function connectTo(rooms, now) {
        var nextIndex = now.toPath[now.toPath.length - 1];
        var result = byIndex(rooms, nextIndex);
        return result;
    }
    RoomSearch.connectTo = connectTo;
    //次の部屋をインデックスで検索する
    function byIndex(rooms, index) {
        var result = rooms.filter(function (room) {
            return room.index === index;
        });
        return result[0];
    }
    RoomSearch.byIndex = byIndex;
    //配列の中に部屋が存在すればtrueを返す
    function isExist(rooms, room) {
        var isExist;
        isExist = rooms.some(function (v, i) {
            if (v.index === room.index)
                return true;
            else
                return false;
        });
        return isExist;
    }
    RoomSearch.isExist = isExist;
})(RoomSearch = exports.RoomSearch || (exports.RoomSearch = {}));
//# sourceMappingURL=RoomSearch.js.map