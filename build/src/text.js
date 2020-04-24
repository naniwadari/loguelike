"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TEXT;
(function (TEXT) {
    TEXT["title"] = "Logue Like";
    TEXT["start"] = "Start";
    TEXT["downstair"] = "\u968E\u6BB5\u3092\u964D\u308A\u307E\u3057\u305F";
    TEXT["wall"] = "\u58C1\u306B\u3076\u3064\u304B\u3063\u305F\uFF01";
    TEXT["init"] = "\u30C0\u30F3\u30B8\u30E7\u30F3\u6700\u9AD8\u301C\u301C\u301C!!";
    TEXT["depth"] = "\u968E";
    TEXT["level"] = "LV";
    TEXT["hp"] = "HP";
    TEXT["ATK"] = "\u653B\u6483\u529B";
    TEXT["DEF"] = "\u9632\u5FA1\u529B";
    TEXT["EXP"] = "\u7D4C\u9A13\u5024";
})(TEXT = exports.TEXT || (exports.TEXT = {}));
var actionMsg;
(function (actionMsg) {
    actionMsg.attack = function (name, damage) {
        return name + "\u306B" + damage + "\u306E\u30C0\u30E1\u30FC\u30B8\u3092\u4E0E\u3048\u305F";
    };
    actionMsg.kill = function (name, exp) {
        return name + "\u3092\u5012\u3057\u305F\u3002" + exp + "\u306E\u7D4C\u9A13\u5024\u3092\u5F97\u305F";
    };
    actionMsg.levelUp = function (level) {
        return "\u30EC\u30D9\u30EB\u304C" + level + "\u306B\u3042\u304C\u3063\u305F";
    };
})(actionMsg = exports.actionMsg || (exports.actionMsg = {}));
