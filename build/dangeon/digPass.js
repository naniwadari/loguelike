"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createFloor_1 = require("./createFloor");
//通路を掘るためのメソッド群
var Dig;
(function (Dig) {
    // 通路を掘るメソッド群
    function sideToside(A, B) {
        //通路を曲げるポイント
        const axisX = Math.floor(Math.abs(A.x + B.x) / 2);
        //掘り進めるポイント
        const AsidePassEnd = { x: axisX, y: A.y };
        const BsidePassEnd = { x: axisX, y: B.y };
        digSideWay(A, AsidePassEnd);
        digSideWay(B, BsidePassEnd);
        //両部屋から掘り進めた道をつなげる
        digVerticalWay(AsidePassEnd, BsidePassEnd);
    }
    Dig.sideToside = sideToside;
    function topTobottom(A, B) {
        const axisY = Math.floor(Math.abs(A.y + B.y) / 2);
        const AverticalPassEnd = { x: A.x, y: axisY };
        const BverticalPassEnd = { x: B.x, y: axisY };
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
        const axisX = start.x;
        if (start.y <= end.y) {
            for (let i = start.y; i <= end.y; i++) {
                createFloor_1.blocks[axisX][i].base = createFloor_1.MapType.floor;
            }
        }
        else {
            for (let i = end.y; i <= start.y; i++) {
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
        const fixedY = start.y;
        if (start.x <= end.x) {
            for (let i = start.x; i <= end.x; i++) {
                createFloor_1.blocks[i][fixedY].base = createFloor_1.MapType.floor;
            }
        }
        else {
            for (let i = end.x; i <= start.x; i++) {
                createFloor_1.blocks[i][fixedY].base = createFloor_1.MapType.floor;
            }
        }
    }
    Dig.digSideWay = digSideWay;
})(Dig = exports.Dig || (exports.Dig = {}));
