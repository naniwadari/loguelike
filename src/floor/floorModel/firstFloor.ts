import Room from "../Room";
import { Floor } from "../Floor";
import { IGate } from "@root/Types";
import fillUpWall from "../usecase/fillUpWall";
import digRooms from "../usecase/digRooms";

/* 一階の設計図 */
const point = { x: 1, y: 1 };
const size = { width: 23, height: 23 };
const rooms = [new Room(point, size, 1)];
const gates: IGate[] = [];
const floorSize = { width: 25, height: 25 };

const firstFloor = new Floor(floorSize, rooms, gates);
firstFloor.blocks = fillUpWall(firstFloor, firstFloor.blocks);
firstFloor.blocks = digRooms(firstFloor, firstFloor.blocks);

export { firstFloor };
