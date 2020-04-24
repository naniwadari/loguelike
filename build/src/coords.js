"use strict";
var RowFirstCoordinates = /** @class */ (function () {
    // コンストラクタ
    function RowFirstCoordinates(width) {
        this.width = width;
    }
    RowFirstCoordinates.GetX = function (i, width) {
        return i % width;
    };
    RowFirstCoordinates.GetY = function (i, width) {
        return Math.floor(i / width);
    };
    RowFirstCoordinates.GetI = function (x, y, width) {
        return y * width + x;
    };
    RowFirstCoordinates.prototype.getX = function (i) {
        return RowFirstCoordinates.GetX(i, this.width);
    };
    RowFirstCoordinates.prototype.getY = function (i) {
        return RowFirstCoordinates.GetY(i, this.width);
    };
    RowFirstCoordinates.prototype.getI = function (x, y) {
        return RowFirstCoordinates.GetI(x, y, this.width);
    };
    return RowFirstCoordinates;
}());
