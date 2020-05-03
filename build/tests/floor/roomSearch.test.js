"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mock = __importStar(require("@root/tests/floor/mock/roomMock"));
var RoomSearch_1 = require("@root/module/RoomSearch");
describe("Roomsearch.update", function () {
    test("should update Array object", function () {
        if (mock.room2.index)
            mock.room1.toPath.push(mock.room2.index);
        var result = RoomSearch_1.RoomSearch.update(mock.rooms, mock.room1);
        expect(result[0]).toBe(mock.room1);
    });
});
//# sourceMappingURL=roomSearch.test.js.map