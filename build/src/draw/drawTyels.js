"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
//階段などのイメージ
var structureImg = new Image();
structureImg.src = "./src/image/GBstructure.png";
//床のイメージ
var tyleImg = new Image();
tyleImg.src = "./src/image/GBtyle.png";
//壁のイメージ
var wallImg = new Image();
wallImg.src = "./src/image/GBwall.png";
var DrawTyle;
(function (DrawTyle) {
    function floor(con, point) {
        con.drawImage(tyleImg, 0, 5 * 16, 16, 16, point.x * config_1.TyleSize.x, point.y * config_1.TyleSize.y, config_1.TyleSize.x, config_1.TyleSize.y);
    }
    DrawTyle.floor = floor;
    function wall(con, point) {
        con.drawImage(wallImg, 0, 3 * 16, 16, 16, point.x * config_1.TyleSize.x, point.y * config_1.TyleSize.y, config_1.TyleSize.x, config_1.TyleSize.y);
    }
    DrawTyle.wall = wall;
    function downstair(con, point) {
        con.drawImage(structureImg, 1 * 16, 1 * 16, 16, 16, point.x * config_1.TyleSize.x, point.y * config_1.TyleSize.y, config_1.TyleSize.x, config_1.TyleSize.y);
    }
    DrawTyle.downstair = downstair;
})(DrawTyle = exports.DrawTyle || (exports.DrawTyle = {}));
