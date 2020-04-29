import Room from "@root/floor/Room";

/*　モックデータ */
const point1 = { x: 10, y: 10 };
const size = { width: 5, height: 5 };
const room1 = new Room(point1, size, 1);
let rooms = [room1];
const point2 = { x: 10, y: 17 };
const duplicateRoom = new Room(point2, size);

/* テスト */
describe("isNoDuplicate", () => {
  test("should return false", () => {
    const result = duplicateRoom.isNoDuplicate(rooms);
    expect(result).toBe(false);
  });
});
