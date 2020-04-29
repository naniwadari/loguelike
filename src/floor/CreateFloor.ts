import fillUpWall from "./usecase/fillUpWall";
import createRooms from "./usecase/createRooms";
import { createGates } from "./usecase/createGates";
import digRooms from "./usecase/digRooms";
import digPaths from "./usecase/digPaths";
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
  let result = createGates(rooms);
  gates = result.gates;
  rooms = result.rooms;
  console.log(gates);
  console.log(rooms);
  let floor = new Floor(floorSize, rooms, gates);
  blocks = fillUpWall(floor, blocks);
  blocks = digRooms(floor, blocks);
  blocks = digPaths(floor, blocks);
  return blocks;
};
