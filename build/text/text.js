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
    TEXT["die"] = "\u3042\u306A\u305F\u306F\u529B\u5C3D\u304D\u305F";
})(TEXT = exports.TEXT || (exports.TEXT = {}));
var actionMsg;
(function (actionMsg) {
    actionMsg.attack = (name, damage) => {
        return `${name}に${damage}のダメージを与えた`;
    };
    actionMsg.kill = (name, exp) => {
        return `${name}を倒した。${exp}の経験値を得た`;
    };
    actionMsg.levelUp = (level) => {
        return `レベルが${level}にあがった`;
    };
    actionMsg.beAttacked = (name, damage) => {
        return `${name}から${damage}のダメージを受けた`;
    };
})(actionMsg = exports.actionMsg || (exports.actionMsg = {}));
