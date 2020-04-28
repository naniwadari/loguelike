"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const State_1 = require("./State");
const config_1 = require("./config");
exports.default = () => {
    let drawStartPoint = { x: 0, y: 0 };
    // 描画を開始するX座標を計算
    //プレイヤーのxが描画範囲の半分以内なら始点は0
    if (State_1.S.player.x <= Math.floor(config_1.DrawRange.x / 2)) {
        drawStartPoint.x = 0;
    }
    //画面描画が右端で止まるところを始点とする
    else if (State_1.S.player.x >= State_1.S.fieldSize.x - Math.floor(config_1.DrawRange.x / 2)) {
        drawStartPoint.x = State_1.S.fieldSize.x - config_1.DrawRange.x;
    }
    else {
        drawStartPoint.x = State_1.S.player.x - Math.floor(config_1.DrawRange.x / 2);
    }
    //描画を開始するY座標を計算
    if (State_1.S.player.y <= Math.floor(config_1.DrawRange.y / 2)) {
        drawStartPoint.y = 0;
    }
    else if (State_1.S.player.y >= State_1.S.fieldSize.y - Math.floor(config_1.DrawRange.y / 2)) {
        drawStartPoint.y = State_1.S.fieldSize.y - config_1.DrawRange.y;
    }
    else {
        drawStartPoint.y = State_1.S.player.y - Math.floor(config_1.DrawRange.y / 2);
    }
    return drawStartPoint;
};
