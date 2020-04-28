import fillUpWall from "./usecase/fillUpWall";
import createRooms from "./usecase/createRooms";
import { createGates, createGate } from "./usecase/createGates";
import digRooms from "./usecase/digRooms";
import digPaths from "./usecase/digPaths";
import checkDeadEnd from "./usecase/checkDeadEnd";
import { IBlock, ISize, IGate } from "../Types";
import Room from "./Room";
import { RoomConf } from "../config";
import { Floor } from "./Floor";

export default (floorSize: ISize) => {
  let rooms: Room[] = [];
  let gates: IGate[] = [];
  let isConnect = false;
  let blocks: IBlock[][] = [];
  //部屋の生成
  rooms = createRooms(RoomConf.trialNum, floorSize);
  //ゲートポイントの生成
  gates = createGates(rooms);
  //通路が通じるかどうかのチェック
  for (let i = 0; !isConnect; i++) {
    let check = checkDeadEnd(rooms);
    if (check.result) {
      isConnect = true;
      break;
    } else {
      let gate = createGate(check.needPath.to, check.needPath.from);
      gates.push(gate);
    }
  }
  //通じたらフロアインスタンスを生成してブロック情報を変える
  console.log(gates);
  let floor = new Floor(floorSize, rooms, gates);
  blocks = fillUpWall(floor, blocks);
  blocks = digRooms(floor, blocks);
  blocks = digPaths(floor, blocks);
  return blocks;
};
