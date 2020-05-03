"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var State_1 = require("../State");
var text_1 = require("../text/text");
var config_1 = require("../config");
var messages_1 = require("../text/messages");
var CreateFloor_1 = __importDefault(require("../floor/CreateFloor"));
var popEnemy_1 = __importDefault(require("../enemy/popEnemy"));
exports.default = (function () {
    State_1.S.player.stairDown();
    State_1.S.messages.add(new messages_1.Message(text_1.TEXT.downstair, config_1.MessageType.normal));
    if (!State_1.S.floors[State_1.S.player.depth]) {
        var floorSize = {
            width: config_1.FloorConf.width,
            height: config_1.FloorConf.height,
        };
        var floor = CreateFloor_1.default(floorSize);
        //フロアステートの更新
        State_1.S.floors[State_1.S.player.depth] = floor;
        //プレイヤーの位置更新
        var playerPoint = floor.coordinateCanStand();
        State_1.S.player.x = playerPoint.x;
        State_1.S.player.y = playerPoint.y;
        //モンスターのリセット
        State_1.S.enemys = [];
        //モンスターのイニシャライズ
        State_1.S.enemys = popEnemy_1.default(floor);
    }
});
//# sourceMappingURL=getOffFloor.js.map