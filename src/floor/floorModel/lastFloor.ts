import Room from "../Room";
import { Floor } from "../Floor";
import { IGate } from "@root/Types";
import fillUpWall from "../usecase/fillUpWall";
import digRooms from "../usecase/digRooms";
import putDownstair from "../usecase/putDownstair";

/* 一階の設計図 */
const point = { x: 1, y: 1 };
const size = { width: 13, height: 13 };
const rooms = [new Room(point, size, 1)];
const downstair = { x: 7, y: 2 };
const gates: IGate[] = [];
const floorSize = { width: 15, height: 15 };

const lastFloor = new Floor(floorSize, rooms, gates, downstair);

lastFloor.blocks = fillUpWall(lastFloor, lastFloor.blocks);
lastFloor.blocks = digRooms(lastFloor, lastFloor.blocks);
lastFloor.blocks = putDownstair(lastFloor);
export { lastFloor };
