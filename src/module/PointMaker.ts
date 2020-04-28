import { IPoint } from "../Types";
import { Random } from "./RandomNum";
import Room from "../floor/Room";
export module PointMaker {
  export function room(room: Room): IPoint {
    const x_min = room.start.x;
    const x_max = room.end.y;
    const y_min = room.start.y;
    const y_max = room.end.y;
    const x_point = Random.rangeInt(x_min, x_max);
    const y_point = Random.rangeInt(y_min, y_max);
    return { x: x_point, y: y_point };
  }
}
