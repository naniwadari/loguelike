import Room from "@root/floor/Room";
import createRooms from "@root/floor/usecase/createRooms";

/*　モックデータ */
const point1 = { x: 10, y: 10 };
const size = { width: 5, height: 5 };
const room1 = new Room(point1, size, 1);
let rooms = [room1];
const point2 = { x: 10, y: 17 };
const duplicateRoom = new Room(point2, size);
const lim = 10;
const floorsize = { width: 25, height: 25 };

describe("createRooms", () => {
  test("integration createRooms", () => {
    const result = createRooms(lim, floorsize);
  });
});
