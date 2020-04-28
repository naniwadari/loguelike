export enum SCREEN {
  X = 1600,
  Y = 800,
}

export enum EnemyConf {
  popInitMin = 0,
  popInitMax = 3,
}

export enum MessageLength {
  limit = 8,
}

export enum MessageType {
  normal = 0,
  special = 1,
  danger = 2,
}
export enum MapBluePrint {
  LX = 25,
  LY = 25,
  PX = 32,
  PY = 32,
  wideX = 25,
  wideY = 25,
}

export enum MapType {
  wall = 0,
  floor = 1,
  downstair = 2,
}

export enum RoomConf {
  // 部屋のサイズ
  maxWidth = 10,
  maxHeight = 10,
  minWidth = 7,
  minHeight = 7,
  //部屋作成の試行回数
  trialNum = 50,
  //部屋と部屋の距離
  distance_x = 3,
  distance_y = 3,
}

export enum TyleSize {
  x = 32,
  y = 32,
}

export enum DrawRange {
  x = 25,
  y = 25,
}

export const CanStand: boolean[] = [];
CanStand[MapType.floor] = true;
CanStand[MapType.wall] = false;
CanStand[MapType.downstair] = true;
