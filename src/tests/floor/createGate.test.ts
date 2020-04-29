import { ISize, IPoint } from "@root/Types";
import Room from "@root/floor/Room";
import {
  createGates,
  createGate,
  findDireciton,
  randomGate,
  findNearRoom,
} from "@root/floor/usecase/createGates";
import { Direction } from "@root/config";

/* モックデータ */
const point1: IPoint = { x: 1, y: 1 };
const point2: IPoint = { x: 1, y: 10 };
const point3: IPoint = { x: 10, y: 5 };
const size: ISize = { width: 5, height: 5 };
const room1 = new Room(point1, size, 1);
const room2 = new Room(point2, size, 2);
const room3 = new Room(point3, size, 3);
let rooms = [room1, room2, room3];

/* テスト */
describe("createGates", () => {
  test("should return collect room.toPath", () => {
    const result = createGates(rooms);
    expect(result.gates.length).toBe(3);
    expect(result.rooms[0].toPath[0]).toBe(2);
    expect(result.rooms[1].toPath[0]).toBe(3);
    expect(result.rooms[2].toPath[0]).toBe(1);
  });
});

describe("findNearRooms", () => {
  test("should return collect near room", () => {
    const result = findNearRoom(room1, rooms);
    expect(result).toBe(room2);
  });
});

describe("createGate", () => {
  test("should return collect point", () => {
    const result = createGate(room1, room2);
    expect(result.A.y).toBe(room1.end.y);
    expect(result.B.y).toBe(room2.start.y);
  });
});

describe("randomGate", () => {
  test("Direction : right", () => {
    const result = randomGate(room1, Direction.right);
    expect(result.y).toBeGreaterThanOrEqual(room1.start.y);
    expect(result.y).toBeLessThanOrEqual(room1.end.y);
    expect(result.x).toBe(room1.end.x);
  });
});

describe("findDirection", () => {
  test("should bottom", () => {
    const result = findDireciton(room1, room2);
    expect(result).toBe(Direction.bottom);
  });
  test("should right", () => {
    const result = findDireciton(room1, room3);
    expect(result).toBe(Direction.right);
  });
  test("should left", () => {
    const result = findDireciton(room3, room1);
    expect(result).toBe(Direction.left);
  });
  test("should top", () => {
    const result = findDireciton(room2, room1);
    expect(result).toBe(Direction.top);
  });
});
