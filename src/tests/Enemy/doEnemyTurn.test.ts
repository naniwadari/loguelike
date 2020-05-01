import { Enemy } from "@root/enemy/Enemy";
import { EnemyList } from "@root/enemy/EnemyList";
import * as t from "@root/enemy/doEnemyTurn";
import { EnemyConf, Direction } from "@root/config";
/* モック */
const enemyPoint = { x: 5, y: 5 };
const material = EnemyList[0];
const enemy = new Enemy(enemyPoint, material);

const topleft = { x: 0, y: 0 };
const left = { x: 0, y: 5 };
const bottomleft = { x: 0, y: 10 };
const bottom = { x: 5, y: 10 };
const bottomright = { x: 10, y: 10 };
const right = { x: 10, y: 5 };
const topright = { x: 10, y: 0 };
const top = { x: 5, y: 0 };
const arrows = [
  topleft,
  left,
  bottomleft,
  bottom,
  bottomright,
  right,
  topright,
  top,
];

const area = t.calcFieldOfView(enemy);

describe("calcFieldOfView", () => {
  test("should return collect Area", () => {
    const result = t.calcFieldOfView(enemy);
    expect(result.start.x).toBe(enemy.point.x - EnemyConf.fieldOfView);
    expect(result.start.y).toBe(enemy.point.y - EnemyConf.fieldOfView);
    expect(result.end.x).toBe(enemy.point.x + EnemyConf.fieldOfView);
    expect(result.end.y).toBe(enemy.point.y + EnemyConf.fieldOfView);
  });
});

describe("movePoint", () => {
  test("should return collect point", () => {
    let result = t.movePoint(enemy, Direction.left);
    expect(result.x).toBe(--enemy.point.x);
    result = t.movePoint(enemy, Direction.right);
    expect(result.x).toBe(++enemy.point.x);
    result = t.movePoint(enemy, Direction.top);
    expect(result.y).toBe(--enemy.point.y);
    result = t.movePoint(enemy, Direction.bottom);
    expect(result.y).toBe(++enemy.point.y);
  });
});

describe("findNearDirection", () => {
  test("should return collect direction", () => {
    let result = t.findNearDirection(topleft, enemy);
    expect(result).toBe(Direction.topLeft);
    result = t.findNearDirection(left, enemy);
    expect(result).toBe(Direction.left);
    result = t.findNearDirection(bottomleft, enemy);
    expect(result).toBe(Direction.bottomLeft);
    result = t.findNearDirection(bottom, enemy);
    expect(result).toBe(Direction.bottom);
    result = t.findNearDirection(bottomright, enemy);
    expect(result).toBe(Direction.bottomRight);
    result = t.findNearDirection(right, enemy);
    expect(result).toBe(Direction.right);
    result = t.findNearDirection(topright, enemy);
    expect(result).toBe(Direction.topRight);
    result = t.findNearDirection(top, enemy);
    expect(result).toBe(Direction.top);
  });
});

describe("findSecondNearDirection", () => {
  test("should return collect two direction", () => {
    let result = t.findSecondNearDirection(Direction.top);
    expect(result.next).toBe(Direction.topRight);
    expect(result.previous).toBe(Direction.topLeft);
    result = t.findSecondNearDirection(Direction.topLeft);
    expect(result.next).toBe(Direction.top);
    expect(result.previous).toBe(Direction.left);
  });
});

describe("findThirdNearDirection", () => {
  test("should return collect two direction", () => {
    let result = t.findThirdNearDirection(Direction.top);
    expect(result.next).toBe(Direction.right);
    expect(result.previous).toBe(Direction.left);
    result = t.findThirdNearDirection(Direction.topRight);
    expect(result.next).toBe(Direction.bottomRight);
    expect(result.previous).toBe(Direction.topLeft);
    result = t.findThirdNearDirection(Direction.topLeft);
    expect(result.next).toBe(Direction.topRight);
    expect(result.previous).toBe(Direction.bottomLeft);
    result = t.findThirdNearDirection(Direction.left);
    expect(result.next).toBe(Direction.top);
    expect(result.previous).toBe(Direction.bottom);
  });
});
describe("isPointInArea", () => {
  test("should return true", () => {
    let testResult = true;
    for (let i = 0; i < arrows.length; i++) {
      let result = t.isPointInArea(arrows[i], area);
      if (!result) {
        testResult = false;
        break;
      }
    }
    expect(testResult).toBe(true);
  });
});
