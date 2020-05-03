"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Room_1 = __importDefault(require("@root/floor/Room"));
var createGates_1 = require("@root/floor/usecase/createGates");
var config_1 = require("@root/config");
/* モックデータ */
var point1 = { x: 1, y: 1 };
var point2 = { x: 1, y: 10 };
var point3 = { x: 10, y: 5 };
var size = { width: 5, height: 5 };
var room1 = new Room_1.default(point1, size, 1);
var room2 = new Room_1.default(point2, size, 2);
var room3 = new Room_1.default(point3, size, 3);
var rooms = [room1, room2, room3];
/* テスト */
describe("createGates", function () {
    test("should return collect room.toPath", function () {
        var result = createGates_1.createGates(rooms);
        expect(result.gates.length).toBe(2);
        expect(result.rooms[0].toPath[0]).toBe(2);
        expect(result.rooms[1].toPath[0]).toBe(3);
    });
});
describe("findNearRooms", function () {
    test("should return collect near room", function () {
        var result = createGates_1.findNearRoom(room1, rooms);
        expect(result).toBe(room2);
    });
});
describe("createGate", function () {
    test("should return collect point", function () {
        var result = createGates_1.createGate(room1, room2);
        expect(result.A.y).toBe(room1.end.y);
        expect(result.B.y).toBe(room2.start.y);
    });
});
describe("randomGate", function () {
    test("Direction : right", function () {
        var result = createGates_1.randomGate(room1, config_1.Direction.right);
        expect(result.y).toBeGreaterThanOrEqual(room1.start.y);
        expect(result.y).toBeLessThanOrEqual(room1.end.y);
        expect(result.x).toBe(room1.end.x);
    });
});
describe("findDirection", function () {
    test("should bottom", function () {
        var result = createGates_1.findDireciton(room1, room2);
        expect(result).toBe(config_1.Direction.bottom);
    });
    test("should right", function () {
        var result = createGates_1.findDireciton(room1, room3);
        expect(result).toBe(config_1.Direction.right);
    });
    test("should left", function () {
        var result = createGates_1.findDireciton(room3, room1);
        expect(result).toBe(config_1.Direction.left);
    });
    test("should top", function () {
        var result = createGates_1.findDireciton(room2, room1);
        expect(result).toBe(config_1.Direction.top);
    });
});
//# sourceMappingURL=createGate.test.js.map