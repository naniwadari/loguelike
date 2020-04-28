"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const text_1 = require("../text/text");
const config_1 = require("../config");
const State_1 = require("../State");
function fillStatusText(con, text, lineNum) {
    con.fillText(text, 8, (24 + 6) * lineNum + 8);
}
exports.default = (con) => {
    //ステータスメッセージの定義
    const depth = State_1.S.player.depth + text_1.TEXT.depth;
    const level = text_1.TEXT.level + ":" + State_1.S.player.level;
    const HP = text_1.TEXT.hp + ":" + State_1.S.player.HP + "/" + State_1.S.player.totalHP;
    const ATK = text_1.TEXT.ATK + ":" + State_1.S.player.ATK;
    const DEF = text_1.TEXT.DEF + ":" + State_1.S.player.DEF;
    const EXP = text_1.TEXT.EXP + ":" + State_1.S.player.EXP + "/" + State_1.S.player.requireEXP;
    con.save();
    con.textBaseline = "top";
    con.textAlign = "left";
    con.font = "24px consolas";
    con.fillStyle = "white";
    con.translate(config_1.DrawRange.x * config_1.TyleSize.x, 0);
    fillStatusText(con, depth, 0);
    fillStatusText(con, level, 1);
    fillStatusText(con, HP, 2);
    fillStatusText(con, ATK, 3);
    fillStatusText(con, DEF, 4);
    fillStatusText(con, EXP, 5);
    con.restore();
};
