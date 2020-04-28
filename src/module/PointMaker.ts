import { IRoom, IPoint } from "../Types";
import { Random } from "../module/random";

export module PointMaker {
  export function room(room: IRoom): IPoint {
    const x_min = room.point.x;
    const x_max = room.point.x + room.size.width - 1;
    const y_min = room.point.y;
    const y_max = room.point.y + room.size.height - 1;
    const x_point = Random.rangeInt(x_min, x_max);
    const y_point = Random.rangeInt(y_min, y_max);
    return { x: x_point, y: y_point };
  }
}
