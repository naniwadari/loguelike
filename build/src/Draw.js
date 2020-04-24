"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var State_1 = require("./State");
var config_1 = require("./config");
var culcDrawStartPoint_1 = __importDefault(require("./culcDrawStartPoint"));
var drawDiagonalArrow_1 = __importDefault(require("./draw/drawDiagonalArrow"));
var drawMessage_1 = __importDefault(require("./draw/drawMessage"));
var drawTyles_1 = require("./draw/drawTyles");
var drawStatus_1 = __importDefault(require("./draw/drawStatus"));
var drawEnemys_1 = __importDefault(require("./draw/drawEnemys"));
var drawPlayer_1 = __importDefault(require("./draw/drawPlayer"));
var drawTitle_1 = __importDefault(require("./draw/drawTitle"));
exports.canvas = document.getElementById("game");
exports.con = exports.canvas.getContext("2d");
function draw(con, env) {
    con.fillStyle = "black";
    con.fillRect(0, 0, config_1.SCREEN.X, config_1.SCREEN.Y);
    if (!State_1.S.Frag.start) {
        drawTitle_1.default(con);
        return;
    }
    var drawStartPoint = culcDrawStartPoint_1.default();
    var playerDrawPoint = {
        x: State_1.S.player.x - drawStartPoint.x,
        y: State_1.S.player.y - drawStartPoint.y,
    };
    // タイルの描画
    drawTyles_1.drawTyles(con, drawStartPoint);
    //プレイヤーの描画
    drawPlayer_1.default(con, playerDrawPoint);
    //モンスターの描画
    drawEnemys_1.default(con, drawStartPoint);
    //メッセージの描画
    drawMessage_1.default(con);
    //ステータスの描画
    drawStatus_1.default(con);
    //斜め移動の矢印の描画
    if (State_1.S.env.diagonal) {
        drawDiagonalArrow_1.default(con, playerDrawPoint);
    }
}
exports.draw = draw;
