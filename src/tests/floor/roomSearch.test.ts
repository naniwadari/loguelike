import * as mock from "@root/tests/floor/mock/roomMock";
import { RoomSearch } from "@root/module/RoomSearch";

describe("Roomsearch.update", () => {
  test("should update Array object", () => {
    if (mock.room2.index) mock.room1.toPath.push(mock.room2.index);
    const result = RoomSearch.update(mock.rooms, mock.room1);
    expect(result[0]).toBe(mock.room1);
  });
});
