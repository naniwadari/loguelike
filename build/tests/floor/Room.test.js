"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Room_1 = __importDefault(require("@root/floor/Room"));
/*　モックデータ */
var point1 = { x: 10, y: 10 };
var size = { width: 5, height: 5 };
var room1 = new Room_1.default(point1, size, 1);
var rooms = [room1];
var point2 = { x: 10, y: 17 };
var duplicateRoom = new Room_1.default(point2, size);
/* テスト */
describe("isNoDuplicate", function () {
    test("should return false", function () {
        var result = duplicateRoom.isNoDuplicate(rooms);
        expect(result).toBe(false);
    });
});
//# sourceMappingURL=Room.test.js.map