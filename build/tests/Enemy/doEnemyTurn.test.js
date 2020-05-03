"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Enemy_1 = require("@root/enemy/Enemy");
var EnemyList_1 = require("@root/enemy/EnemyList");
var t = __importStar(require("@root/enemy/doEnemyTurn"));
var config_1 = require("@root/config");
/* モック */
var point = { x: 5, y: 5 };
var material = EnemyList_1.EnemyList[0];
var enemy = new Enemy_1.Enemy(point, material);
var topleft = { x: 0, y: 0 };
var left = { x: 0, y: 5 };
var bottomleft = { x: 0, y: 10 };
var bottom = { x: 5, y: 10 };
var bottomright = { x: 10, y: 10 };
var right = { x: 10, y: 5 };
var topright = { x: 10, y: 0 };
var top = { x: 5, y: 0 };
var arrows = [
    topleft,
    left,
    bottomleft,
    bottom,
    bottomright,
    right,
    topright,
    top,
];
var area = t.calcFieldOfView(enemy);
describe("calcFieldOfView", function () {
    test("should return collect Area", function () {
        var result = t.calcFieldOfView(enemy);
        expect(result.start.x).toBe(enemy.point.x - config_1.EnemyConf.fieldOfView);
        expect(result.start.y).toBe(enemy.point.y - config_1.EnemyConf.fieldOfView);
        expect(result.end.x).toBe(enemy.point.x + config_1.EnemyConf.fieldOfView);
        expect(result.end.y).toBe(enemy.point.y + config_1.EnemyConf.fieldOfView);
    });
});
describe("movePoint", function () {
    test("should return collect point", function () {
        var result = t.movePoint(enemy, config_1.Direction.left);
        expect(result.x).toBe(--enemy.point.x);
        result = t.movePoint(enemy, config_1.Direction.right);
        expect(result.x).toBe(++enemy.point.x);
        result = t.movePoint(enemy, config_1.Direction.top);
        expect(result.y).toBe(--enemy.point.y);
        result = t.movePoint(enemy, config_1.Direction.bottom);
        expect(result.y).toBe(++enemy.point.y);
    });
});
describe("findNearDirection", function () {
    test("should return collect direction", function () {
        var result = t.findNearDirection(topleft, enemy);
        expect(result).toBe(config_1.Direction.topLeft);
        result = t.findNearDirection(left, enemy);
        expect(result).toBe(config_1.Direction.left);
        result = t.findNearDirection(bottomleft, enemy);
        expect(result).toBe(config_1.Direction.bottomLeft);
        result = t.findNearDirection(bottom, enemy);
        expect(result).toBe(config_1.Direction.bottom);
        result = t.findNearDirection(bottomright, enemy);
        expect(result).toBe(config_1.Direction.bottomRight);
        result = t.findNearDirection(right, enemy);
        expect(result).toBe(config_1.Direction.right);
        result = t.findNearDirection(topright, enemy);
        expect(result).toBe(config_1.Direction.topRight);
        result = t.findNearDirection(top, enemy);
        expect(result).toBe(config_1.Direction.top);
    });
});
describe("findSecondNearDirection", function () {
    test("should return collect two direction", function () {
        var result = t.findSecondNearDirection(config_1.Direction.top);
        expect(result.next).toBe(config_1.Direction.topRight);
        expect(result.previous).toBe(config_1.Direction.topLeft);
        result = t.findSecondNearDirection(config_1.Direction.topLeft);
        expect(result.next).toBe(config_1.Direction.top);
        expect(result.previous).toBe(config_1.Direction.left);
    });
});
describe("findThirdNearDirection", function () {
    test("should return collect two direction", function () {
        var result = t.findThirdNearDirection(config_1.Direction.top);
        expect(result.next).toBe(config_1.Direction.right);
        expect(result.previous).toBe(config_1.Direction.left);
        result = t.findThirdNearDirection(config_1.Direction.topRight);
        expect(result.next).toBe(config_1.Direction.bottomRight);
        expect(result.previous).toBe(config_1.Direction.topLeft);
        result = t.findThirdNearDirection(config_1.Direction.topLeft);
        expect(result.next).toBe(config_1.Direction.topRight);
        expect(result.previous).toBe(config_1.Direction.bottomLeft);
        result = t.findThirdNearDirection(config_1.Direction.left);
        expect(result.next).toBe(config_1.Direction.top);
        expect(result.previous).toBe(config_1.Direction.bottom);
    });
});
describe("isPointInArea", function () {
    test("should return true", function () {
        var testResult = true;
        for (var i = 0; i < arrows.length; i++) {
            var result = t.isPointInArea(arrows[i], area);
            if (!result) {
                testResult = false;
                break;
            }
        }
        expect(testResult).toBe(true);
    });
});
//# sourceMappingURL=doEnemyTurn.test.js.map