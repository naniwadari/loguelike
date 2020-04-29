import createRooms from "./usecase/createRooms";
import createDownstair from "./usecase/createDownstair";
import { createGates } from "./usecase/createGates";
import fillUpWall from "./usecase/fillUpWall";
import digRooms from "./usecase/digRooms";
import digPaths from "./usecase/digPaths";
import putDownstair from "./usecase/putDownstair";
import Room from "./Room";
import { ISize, IGate, IPoint } from "../Types";
import { RoomConf } from "../config";
import { Floor } from "./Floor";

export default (floorSize: ISize) => {
  let rooms: Room[] = [];
  let gates: IGate[] = [];
  let downstair: IPoint;
  //部屋の生成
  rooms = createRooms(RoomConf.trialNum, floorSize);
  //ゲートポイントの生成
  let result = createGates(rooms);
  gates = result.gates;
  rooms = result.rooms;
  downstair = createDownstair(rooms);
  console.log(gates);
  console.log(rooms);
  let floor = new Floor(floorSize, rooms, gates, downstair);
  floor.blocks = fillUpWall(floor, floor.blocks);
  floor.blocks = digRooms(floor, floor.blocks);
  floor.blocks = digPaths(floor, floor.blocks);
  floor.blocks = putDownstair(floor);
  return floor;
};
