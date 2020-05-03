"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Room_1 = __importDefault(require("@root/floor/Room"));
/* モックデータ */
exports.point1 = { x: 1, y: 1 };
exports.point2 = { x: 1, y: 10 };
exports.point3 = { x: 10, y: 5 };
exports.size = { width: 5, height: 5 };
exports.room1 = new Room_1.default(exports.point1, exports.size, 1);
exports.room2 = new Room_1.default(exports.point2, exports.size, 2);
exports.room3 = new Room_1.default(exports.point3, exports.size, 3);
exports.rooms = [exports.room1, exports.room2, exports.room3];
//# sourceMappingURL=roomMock.js.map