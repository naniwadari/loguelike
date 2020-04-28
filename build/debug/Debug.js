"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const State_1 = require("../State");
const config_1 = require("../config");
const Draw_1 = require("../draw/Draw");
const CreateFloor_1 = __importDefault(require("../floor/CreateFloor"));
exports.default = () => {
    window.addEventListener("keydown", (e) => {
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
};
function mapRecreate() {
    State_1.S.fields[State_1.S.player.depth].blocks = CreateFloor_1.default({ width: 25, height: 25 });
    Draw_1.draw(Draw_1.con, State_1.S.env);
}
function forceGameOver() {
    State_1.S.player.HP = 0;
    State_1.S.Frag.gameover = true;
    console.log("強制ゲームオーバー");
}
function searchDownstairsPoint() {
    const field = State_1.S.fields[State_1.S.player.depth];
    let downStairsPoint = { x: 0, y: 0 };
    for (let i = 0; i < field.blocks.length; i++) {
        for (let j = 0; j < field.blocks.length; j++) {
            let targetBlock = field.blocks[i][j];
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
    const enemys = State_1.S.fields[State_1.S.player.depth].enemys;
    for (let i = 0; i < enemys.length; i++) {
        console.log(enemys[i].point);
    }
}
