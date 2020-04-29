import { ISize, IPoint } from "../Types";
import { RoomConf } from "../config";

export default class Room {
  index?: number;
  size: ISize;
  start: IPoint;
  end: IPoint;
  center: IPoint;
  hasPath: number[];
  toPath: number[];

  constructor(point: IPoint, size: ISize, index?: number) {
    if (index) {
      this.index = index;
    }
    this.size = size;
    this.start = point;
    this.end = this.calcEnd(point, size);
    this.center = this.calcCenter(point, size);
    this.hasPath = [];
    this.toPath = [];
  }

  //終点を計算
  calcEnd(point: IPoint, size: ISize) {
    const result = {
      x: point.x + size.width - 1,
      y: point.y + size.height - 1,
    };
    return result;
  }

  //中心点を計算
  calcCenter(point: IPoint, size: ISize) {
    const result = {
      x: Math.floor(point.x + size.width / 2),
      y: Math.floor(point.y + size.height / 2),
    };
    return result;
  }

  isNoDuplicate(rooms: Room[]) {
    let result = true;
    const area_x = {
      start: this.start.x - RoomConf.distance_x,
      end: this.end.x + RoomConf.distance_y,
    };
    const area_y = {
      start: this.start.y - RoomConf.distance_y,
      end: this.end.y + RoomConf.distance_y,
    };
    //まだ部屋が無い場合、確実に生成できるので処理終了
    if (rooms.length === 0) return result;
    //各部屋のxとyを比較する
    for (let i = 0; i < rooms.length; i++) {
      let room = rooms[i];
      if (
        (area_x.start <= room.start.x &&
          room.start.x <= area_x.end &&
          area_y.start <= room.start.y &&
          room.start.y <= area_y.end) ||
        (area_x.start <= room.end.x &&
          room.end.x <= area_x.end &&
          area_y.start <= room.end.y &&
          room.end.y <= area_y.end)
      ) {
        result = false;
        break;
      }
    }
    return result;
  }

  //作成しようとしている部屋がフロアからはみだしていないか確認する
  isInFloor(floorSize: ISize) {
    let result = true;
    //部屋がフロアからはみ出していないか確認
    if (
      this.start.x < 1 ||
      this.start.y < 1 ||
      this.end.x > floorSize.width - 1 ||
      this.end.y > floorSize.height - 1
    ) {
      result = false;
    }
    return result;
  }
}
