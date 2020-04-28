import { ISize, IPoint } from "@root/Types";
import Room from "@root/floor/Room";
import { createGate, findDireciton } from "@root/floor/usecase/createGates";
import { Direction } from "@root/config";
const point1: IPoint = { x: 1, y: 1 };
const point2: IPoint = { x: 1, y: 10 };
const point3: IPoint = { x: 10, y: 5 };
const size: ISize = { width: 5, height: 5 };
const room1 = new Room(point1, size);
const room2 = new Room(point2, size);
const room3 = new Room(point3, size);

describe("findDirection", () => {
  test("bottom", () => {
    const result = findDireciton(room1, room2);
    expect(result).toBe(Direction.bottom);
  });
  test("right", () => {
    const result = findDireciton(room1, room3);
    expect(result).toBe(Direction.right);
  });
  test("left", () => {
    const result = findDireciton(room3, room1);
    expect(result).toBe(Direction.left);
  });
  test("top", () => {
    const result = findDireciton(room2, room1);
    expect(result).toBe(Direction.top);
  });
});
