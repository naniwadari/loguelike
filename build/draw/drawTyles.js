"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const State_1 = require("../State");
//階段などのイメージ
const structureImg = new Image();
structureImg.src = "./src/image/GBstructure.png";
//床のイメージ
const tyleImg = new Image();
tyleImg.src = "./src/image/GBtyle.png";
//壁のイメージ
const wallImg = new Image();
wallImg.src = "./src/image/GBwall.png";
function drawTyles(con, drawStartPoint) {
    for (let i = 0; i < config_1.DrawRange.x; i++) {
        for (let j = 0; j < config_1.DrawRange.y; j++) {
            const block = State_1.S.fields[State_1.S.player.depth].blocks[drawStartPoint.x + i][drawStartPoint.y + j];
            const tyleDrawPoint = { x: i, y: j };
            if (block.base === config_1.MapType.floor) {
                DrawTyle.floor(con, tyleDrawPoint);
            }
            else if (block.base === config_1.MapType.wall) {
                DrawTyle.wall(con, tyleDrawPoint);
            }
            else if (block.base === config_1.MapType.downstair) {
                //下地
                DrawTyle.floor(con, tyleDrawPoint);
                DrawTyle.downstair(con, tyleDrawPoint);
            }
        }
    }
}
exports.drawTyles = drawTyles;
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
