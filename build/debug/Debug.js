"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var State_1 = require("../State");
var Draw_1 = require("../draw/Draw");
var getOffFloor_1 = __importDefault(require("../event/getOffFloor"));
exports.default = (function () {
    window.addEventListener("keydown", function (e) {
        // デバッグキー P
        if (e.keyCode === 80) {
            searchDownstairsPoint();
            searchEnemysPoint();
        }
        // マップリクリエイトキー　0
        else if (e.keyCode === 48) {
            mapRecreate();
        }
    });
});
function mapRecreate() {
    getOffFloor_1.default();
    Draw_1.draw(Draw_1.con, State_1.S.env);
}
function forceGameOver() {
    State_1.S.player.HP = 0;
    State_1.S.Frag.gameover = true;
    console.log("強制ゲームオーバー");
}
function searchDownstairsPoint() {
    var floor = State_1.S.floors[State_1.S.player.depth];
    var downStairsPoint = floor.downstair;
    console.log("階段の座標");
    console.log(downStairsPoint);
}
function searchEnemysPoint() {
    console.log("モンスターの座標");
    var enemys = State_1.S.enemys;
    for (var i = 0; i < enemys.length; i++) {
        console.log(enemys[i]);
    }
}
//# sourceMappingURL=Debug.js.map