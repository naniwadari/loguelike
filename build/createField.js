"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var RandomSeed_1 = require("./RandomSeed");
function createField(depth, upstairs, baseSeed) {
    var random = new RandomSeed_1.RandomSeed(baseSeed + "," + depth.toString(10));
    var blocks = [];
    var newX = config_1.MapBluePrint.LX;
    var newY = config_1.MapBluePrint.LY;
    if (depth > 0) {
        newX = config_1.MapBluePrint.wideX;
        newY = config_1.MapBluePrint.wideY;
    }
    for (var i = 0; i < newX; i++) {
        // マップブロックの座標{ i , j }にそれぞれブロックタイプを入れていく
        blocks[i] = [];
        for (var j = 0; j < newY; j++) {
            if (i === 0 || j === 0 || i === newX - 1 || j === newY - 1) {
                blocks[i][j] = {
                    base: config_1.MapType.wall,
                };
            }
            else {
                blocks[i][j] = {
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
    // //部屋の初期化
    // let splitMaterials: IRoom[] = [
    //   {
    //     start: { x: 1, y: 1 },
    //     end: { x: newX - 2, y: newY - 2 },
    //   },
    // ];
    // //空の配列が帰ってきた場合、emptyRoomsに入れる
    // let splitedRooms: IRoom[] = [];
    // //確率
    // let spritProbs = [1, 1, 1, 1, 1, 1, 0.5, 0.5, 0.5, 0.5];
    // // 部屋数が0より大きく、分割回数が０より大きいあいだ(最大１０回)
    // while (splitMaterials.length > 0 && spritProbs.length > 0) {
    //   let room = splitMaterials[0];
    //   let spritProb = spritProbs[0];
    //   splitMaterials.shift();
    //   spritProbs.shift();
    //   let newRooms = splitRoom(blocks, room, spritProb, random);
    //   //splitRoomで生成された部屋を配列に追加
    //   for (var i = 0; i < newRooms.length; i++) {
    //     splitMaterials.push(newRooms[i]);
    //   }
    //   //分割されなかった場合元のroomをresultにいれる
    //   if (newRooms.length === 0) {
    //     splitedRooms.push(room);
    //   }
    // }
    // //処理が終了しても素材がまだ残っていた場合空にする
    // while (splitMaterials.length > 0) {
    //   splitedRooms.push(splitMaterials[0]);
    //   splitMaterials.shift();
    // }
    // //階段の生成処理
    // let newDownStairs = 1;
    // //newDownStairsが0になるまで繰り返す
    // while (newDownStairs > 0) {
    //   // x,yをランダムに取得
    //   let x = random.num(newX - 2) + 1;
    //   let y = random.num(newY - 2) + 1;
    //   let isUpstairsPoint = false;
    //   // upstairsは一つ前の階層の階段の位置
    //   for (let i = 0; i < upstairs.length; i++) {
    //     // x,yが前回と同じだった場合fをfalseにしてループ処理終了
    //     if (x === upstairs[i].x && y === upstairs[i].y) {
    //       isUpstairsPoint = true;
    //       break;
    //     }
    //   }
    //   //前回と違ったらランダムな位置に階段を置いて処理終了
    //   if (!isUpstairsPoint) {
    //     blocks[x][y].base = MapType.downstair;
    //     newDownStairs--;
    //   }
    // }
    // //階段を降りた場所が壁だったらフロアに変更する
    // for (let i = 0; i < upstairs.length; i++) {
    //   if ((blocks[upstairs[i].x][upstairs[i].y].base = MapType.wall)) {
    //     blocks[upstairs[i].x][upstairs[i].y].base = MapType.floor;
    //   }
    // }
    return {
        size: { x: newX, y: newY },
        blocks: blocks,
        enemys: [],
    };
}
exports.createField = createField;
// export function putDownStairs(rooms: IRoom[]) {
//   let isPut = false;
//   for (let i = 0; !isPut; i++) {
//     let room = rooms[Random.rangeInt(0, rooms.length)];
//     let point = PointMaker.room(room);
//     let targetBlock = S.fields[S.player.depth].blocks[point.x][point.y];
//     if (targetBlock.base === MapType.floor) {
//       isPut = true;
//       targetBlock.base = MapType.downstair;
//       console.log(point);
//     }
//   }
// }
