"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var State_1 = require("../State");
var config_1 = require("../config");
var createFloor_1 = require("../dangeon/createFloor");
var Draw_1 = require("../draw/Draw");
exports.default = (function () {
    window.addEventListener("keydown", function (e) {
        // デバッグキー P
        if (e.keyCode === 80) {
            searchDownstairsPoint();
            searchEnemysPoint();
        }
        // 強制ゲームオーバーキー 0
        else if (e.keyCode === 48) {
            mapRecreate();
        }
    });
});
function mapRecreate() {
    State_1.S.fields[State_1.S.player.depth].blocks = createFloor_1.createFloor();
    Draw_1.draw(Draw_1.con, State_1.S.env);
}
function forceGameOver() {
    State_1.S.player.HP = 0;
    State_1.S.Frag.gameover = true;
    console.log("強制ゲームオーバー");
}
function searchDownstairsPoint() {
    var field = State_1.S.fields[State_1.S.player.depth];
    var downStairsPoint = { x: 0, y: 0 };
    for (var i = 0; i < field.blocks.length; i++) {
        for (var j = 0; j < field.blocks.length; j++) {
            var targetBlock = field.blocks[i][j];
            if (targetBlock.base === config_1.MapType.downstair) {
                downStairsPoint = { x: i, y: j };
                break;
            }
        }
    }
    console.log("階段の座標");
    console.log(downStairsPoint);
}
function searchEnemysPoint() {
    console.log("モンスターの座標");
    var enemys = State_1.S.fields[State_1.S.player.depth].enemys;
    for (var i = 0; i < enemys.length; i++) {
        console.log(enemys[i].point);
    }
}
