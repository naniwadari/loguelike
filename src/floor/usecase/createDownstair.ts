import Room from "../Room";
import { Random } from "../../module/RandomNum";

export default (rooms: Room[]) => {
  const roomNum = Random.rangeInt(0, rooms.length - 1);
  const room = rooms[roomNum];
  const x = Random.rangeInt(room.start.x, room.end.x);
  const y = Random.rangeInt(room.start.y, room.end.y);
  const putPoint = { x: x, y: y };
  return putPoint;
};
