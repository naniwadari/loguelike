"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var Random_1 = require("./Random");
var splitRoom_1 = require("./splitRoom");
var popEnemy_1 = __importDefault(require("./popEnemy"));
function createField(depth, upstairs, baseSeed) {
    var random = new Random_1.Random(baseSeed + "," + depth.toString(10));
    var blocks = [];
    var newX = config_1.MapBluePrint.LX;
    var newY = config_1.MapBluePrint.LY;
    if (depth > 0) {
        newX = config_1.MapBluePrint.wideX;
        newY = config_1.MapBluePrint.wideY;
    }
    for (var i_1 = 0; i_1 < newX; i_1++) {
        // マップブロックの座標{ i , j }にそれぞれブロックタイプを入れていく
        blocks[i_1] = [];
        for (var j = 0; j < newY; j++) {
            if (i_1 === 0 || j === 0 || i_1 === newX - 1 || j === newY - 1) {
                blocks[i_1][j] = {
                    base: config_1.MapType.wall,
                };
            }
            else {
                blocks[i_1][j] = {
                    base: config_1.MapType.floor,
                };
            }
        }
    }
    //0階の場合所定の位置に階段を置く
    if (depth === 0) {
        blocks[12][5] = {
            base: config_1.MapType.downstair,
        };
        return {
            size: { x: newX, y: newY },
            blocks: blocks,
            enemys: [],
        };
    }
    //部屋の初期化
    var splitMaterials = [
        {
            start: { x: 1, y: 1 },
            end: { x: newX - 2, y: newY - 2 },
        },
    ];
    //空の配列が帰ってきた場合、emptyRoomsに入れる
    var splitedRooms = [];
    //確率
    var spritProbs = [1, 1, 1, 1, 1, 1, 0.5, 0.5, 0.5, 0.5];
    // 部屋数が0より大きく、分割回数が０より大きいあいだ(最大１０回)
    while (splitMaterials.length > 0 && spritProbs.length > 0) {
        var room = splitMaterials[0];
        var spritProb = spritProbs[0];
        splitMaterials.shift();
        spritProbs.shift();
        var newRooms = splitRoom_1.splitRoom(blocks, room, spritProb, random);
        //splitRoomで生成された部屋を配列に追加
        for (var i = 0; i < newRooms.length; i++) {
            splitMaterials.push(newRooms[i]);
        }
        //分割されなかった場合元のroomをresultにいれる
        if (newRooms.length === 0) {
            splitedRooms.push(room);
        }
    }
    //処理が終了しても素材がまだ残っていた場合空にする
    while (splitMaterials.length > 0) {
        splitedRooms.push(splitMaterials[0]);
        splitMaterials.shift();
    }
    //モンスターのポップ
    var popEnemys = popEnemy_1.default(splitedRooms, random, upstairs);
    //階段の生成処理
    var newDownStairs = 1;
    //newDownStairsが0になるまで繰り返す
    while (newDownStairs > 0) {
        // x,yをランダムに取得
        var x = random.num(newX - 2) + 1;
        var y = random.num(newY - 2) + 1;
        var isUpstairsPoint = false;
        // upstairsは一つ前の階層の階段の位置
        for (var i_2 = 0; i_2 < upstairs.length; i_2++) {
            // x,yが前回と同じだった場合fをfalseにしてループ処理終了
            if (x === upstairs[i_2].x && y === upstairs[i_2].y) {
                isUpstairsPoint = true;
                break;
            }
        }
        //前回と違ったらランダムな位置に階段を置いて処理終了
        if (!isUpstairsPoint) {
            blocks[x][y].base = config_1.MapType.downstair;
            newDownStairs--;
        }
    }
    //階段を降りた場所が壁だったらフロアに変更する
    for (var i_3 = 0; i_3 < upstairs.length; i_3++) {
        if ((blocks[upstairs[i_3].x][upstairs[i_3].y].base = config_1.MapType.wall)) {
            blocks[upstairs[i_3].x][upstairs[i_3].y].base = config_1.MapType.floor;
        }
    }
    return {
        size: { x: newX, y: newY },
        blocks: blocks,
        enemys: popEnemys,
    };
}
exports.createField = createField;
