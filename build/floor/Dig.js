"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
class Dig {
    constructor(A, B) {
        (this.start = A), (this.end = B);
    }
    //部屋を掘る
    square(blocks) {
        for (let i = this.start.x; i <= this.end.x; i++) {
            for (let j = this.start.y; j <= this.end.y; j++) {
                blocks[i][j].base = config_1.MapType.floor;
            }
        }
        return blocks;
    }
    //横にパスを掘る
    sideToside(blocks) {
        const axisX = Math.floor(Math.abs(this.start.x + this.end.x) / 2);
        //掘り進めるポイント
        const start_end = { x: axisX, y: this.start.y };
        const end_end = { x: axisX, y: this.end.y };
        blocks = new Dig(this.start, start_end).side(blocks);
        blocks = new Dig(this.end, end_end).side(blocks);
        //両部屋から掘り進めた道をつなげる
        blocks = new Dig(start_end, end_end).vertical(blocks);
        return blocks;
    }
    //縦にパスを掘る
    topTobottom(blocks) {
        const axisY = Math.floor(Math.abs(this.start.y + this.end.y) / 2);
        const start_end = { x: this.start.x, y: axisY };
        const end_end = { x: this.end.x, y: axisY };
        blocks = new Dig(this.start, start_end).vertical(blocks);
        blocks = new Dig(this.end, end_end).vertical(blocks);
        //両部屋から掘り進めた道をつなげる
        blocks = new Dig(start_end, end_end).side(blocks);
        return blocks;
    }
    //縦に掘る
    vertical(blocks) {
        //縦軸がずれてたら処理終了
        if (this.start.x !== this.end.x) {
            console.log("基準となる軸がずれています");
            return blocks;
        }
        const axisX = this.start.x;
        if (this.start.y <= this.end.y) {
            for (let i = this.start.y; i <= this.end.y; i++) {
                blocks[axisX][i].base = config_1.MapType.floor;
            }
        }
        else {
            for (let i = this.end.y; i <= this.start.y; i++) {
                blocks[axisX][i].base = config_1.MapType.floor;
            }
        }
        return blocks;
    }
    //横に掘る
    side(blocks) {
        if (this.start.y !== this.end.y) {
            console.log("基準となる軸がずれています");
            return blocks;
        }
        const axisY = this.start.y;
        if (this.start.x <= this.end.x) {
            for (let i = this.start.x; i <= this.end.x; i++) {
                blocks[i][axisY].base = config_1.MapType.floor;
            }
        }
        else {
            for (let i = this.end.x; i <= this.start.x; i++) {
                blocks[i][axisY].base = config_1.MapType.floor;
            }
        }
        return blocks;
    }
}
exports.default = Dig;
