import { MapBluePrint, MapType } from "./config";

export interface IMap {
  LX: number;
  LY: number;
  PX: number;
  PY: number;
}

class Map implements IMap {
  LX: number;
  LY: number;
  PX: number;
  PY: number;

  B_FLOOR = 0;
  B_WALL = 1;
  B_DOWNSTAIR = 2;
  B_CAN_STAND: any[] = [];
  constructor(BluePrint: IMap) {
    this.LX = BluePrint.LX;
    this.LY = BluePrint.LY;
    this.PX = BluePrint.PX;
    this.PY = BluePrint.PY;
    this.B_CAN_STAND[this.B_DOWNSTAIR] = true;
    this.B_CAN_STAND[this.B_FLOOR] = true;
    this.B_CAN_STAND[this.B_WALL] = false;
  }
}
export const map = new Map(MapBluePrint);
