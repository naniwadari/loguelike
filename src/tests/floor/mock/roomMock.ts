import { IPoint, ISize } from "@root/Types";
import Room from "@root/floor/Room";

/* モックデータ */
export const point1: IPoint = { x: 1, y: 1 };
export const point2: IPoint = { x: 1, y: 10 };
export const point3: IPoint = { x: 10, y: 5 };
export const size: ISize = { width: 5, height: 5 };
export const room1 = new Room(point1, size, 1);
export const room2 = new Room(point2, size, 2);
export const room3 = new Room(point3, size, 3);
export let rooms = [room1, room2, room3];
