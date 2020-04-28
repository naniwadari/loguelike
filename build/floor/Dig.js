"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var Dig = /** @class */ (function () {
    function Dig(A, B) {
        (this.start = A), (this.end = B);
    }
    //部屋を掘る
    Dig.prototype.square = function (blocks) {
        for (var i = this.start.x; i <= this.end.x; i++) {
            for (var j = this.start.y; j <= this.end.y; j++) {
                blocks[i][j].base = config_1.MapType.floor;
            }
        }
        return blocks;
    };
    //横にパスを掘る
    Dig.prototype.sideToside = function (blocks) {
        var axisX = Math.floor(Math.abs(this.start.x + this.end.x) / 2);
        //掘り進めるポイント
        var start_end = { x: axisX, y: this.start.y };
        var end_end = { x: axisX, y: this.end.y };
        blocks = new Dig(this.start, start_end).side(blocks);
        blocks = new Dig(this.end, end_end).side(blocks);
        //両部屋から掘り進めた道をつなげる
        blocks = new Dig(start_end, end_end).vertical(blocks);
        return blocks;
    };
    //縦にパスを掘る
    Dig.prototype.topTobottom = function (blocks) {
        var axisY = Math.floor(Math.abs(this.start.y + this.end.y) / 2);
        var start_end = { x: this.start.x, y: axisY };
        var end_end = { x: this.end.x, y: axisY };
        blocks = new Dig(this.start, start_end).vertical(blocks);
        blocks = new Dig(this.end, end_end).vertical(blocks);
        //両部屋から掘り進めた道をつなげる
        blocks = new Dig(start_end, end_end).side(blocks);
        return blocks;
    };
    //縦に掘る
    Dig.prototype.vertical = function (blocks) {
        //縦軸がずれてたら処理終了
        if (this.start.x !== this.end.x) {
            console.log("基準となる軸がずれています");
            return blocks;
        }
        var axisX = this.start.x;
        if (this.start.y <= this.end.y) {
            for (var i = this.start.y; i <= this.end.y; i++) {
                blocks[axisX][i].base = config_1.MapType.floor;
            }
        }
        else {
            for (var i = this.end.y; i <= this.start.y; i++) {
                blocks[axisX][i].base = config_1.MapType.floor;
            }
        }
        return blocks;
    };
    //横に掘る
    Dig.prototype.side = function (blocks) {
        if (this.start.y !== this.end.y) {
            console.log("基準となる軸がずれています");
            return blocks;
        }
        var axisY = this.start.y;
        if (this.start.x <= this.end.x) {
            for (var i = this.start.x; i <= this.end.x; i++) {
                blocks[i][axisY].base = config_1.MapType.floor;
            }
        }
        else {
            for (var i = this.end.x; i <= this.start.x; i++) {
                blocks[i][axisY].base = config_1.MapType.floor;
            }
        }
        return blocks;
    };
    return Dig;
}());
exports.default = Dig;
