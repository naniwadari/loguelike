"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MoveEvent_1 = __importDefault(require("./MoveEvent"));
var State_1 = require("./State");
var Draw_1 = require("./Draw");
var ArrowKeyEvents_1 = __importDefault(require("./ArrowKeyEvents"));
var createField_1 = require("./createField");
var player_1 = __importDefault(require("./player"));
var messages_1 = require("./messages");
var text_1 = require("./text");
var config_1 = require("./config");
var Debug_1 = __importDefault(require("./debug/Debug"));
// 決定キーを押すとinitイベントが走る
function init() {
    State_1.S.Frag.gameover = false;
    State_1.S.fields[0] = createField_1.createField(0, [], State_1.S.seed);
    var newPlayer = new player_1.default(12, 12);
    State_1.S.player = newPlayer;
    State_1.S.messages.add(new messages_1.Message(text_1.TEXT.init, config_1.MessageType.special));
}
exports.init = init;
//フィールド条件
Draw_1.draw(Draw_1.con, State_1.S.env);
//キーボードイベント
ArrowKeyEvents_1.default();
/* プレイヤー移動イベント */
MoveEvent_1.default();
//デバッグ
Debug_1.default();
