"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Random;
(function (Random) {
    //範囲内の整数をランダムに返す
    function rangeInt(min, max) {
        var result = Math.floor(Math.random() * (max - min) + min);
        return result;
    }
    Random.rangeInt = rangeInt;
})(Random = exports.Random || (exports.Random = {}));
//# sourceMappingURL=RandomNum.js.map