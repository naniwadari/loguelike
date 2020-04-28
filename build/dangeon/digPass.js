"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createFloor_1 = require("./createFloor");
//通路を掘るためのメソッド群
var Dig;
(function (Dig) {
    // 通路を掘るメソッド群
    function sideToside(A, B) {
        //通路を曲げるポイント
        var axisX = Math.floor(Math.abs(A.x + B.x) / 2);
        //掘り進めるポイント
        var AsidePassEnd = { x: axisX, y: A.y };
        var BsidePassEnd = { x: axisX, y: B.y };
        digSideWay(A, AsidePassEnd);
        digSideWay(B, BsidePassEnd);
        //両部屋から掘り進めた道をつなげる
        digVerticalWay(AsidePassEnd, BsidePassEnd);
    }
    Dig.sideToside = sideToside;
    function topTobottom(A, B) {
        var axisY = Math.floor(Math.abs(A.y + B.y) / 2);
        var AverticalPassEnd = { x: A.x, y: axisY };
        var BverticalPassEnd = { x: B.x, y: axisY };
        digVerticalWay(A, AverticalPassEnd);
        digVerticalWay(B, BverticalPassEnd);
        digSideWay(AverticalPassEnd, BverticalPassEnd);
    }
    Dig.topTobottom = topTobottom;
    //床を縦に指定分掘る
    function digVerticalWay(start, end) {
        //縦軸がずれてたら処理終了
        if (start.x !== end.x) {
            console.log("基準となる軸がずれています");
            return;
        }
        var axisX = start.x;
        if (start.y <= end.y) {
            for (var i = start.y; i <= end.y; i++) {
                createFloor_1.blocks[axisX][i].base = createFloor_1.MapType.floor;
            }
        }
        else {
            for (var i = end.y; i <= start.y; i++) {
                createFloor_1.blocks[axisX][i].base = createFloor_1.MapType.floor;
            }
        }
    }
    Dig.digVerticalWay = digVerticalWay;
    //床を横に指定分掘る
    function digSideWay(start, end) {
        if (start.y !== end.y) {
            console.log("基準となる軸がずれています");
            return;
        }
        var fixedY = start.y;
        if (start.x <= end.x) {
            for (var i = start.x; i <= end.x; i++) {
                createFloor_1.blocks[i][fixedY].base = createFloor_1.MapType.floor;
            }
        }
        else {
            for (var i = end.x; i <= start.x; i++) {
                createFloor_1.blocks[i][fixedY].base = createFloor_1.MapType.floor;
            }
        }
    }
    Dig.digSideWay = digSideWay;
})(Dig = exports.Dig || (exports.Dig = {}));
