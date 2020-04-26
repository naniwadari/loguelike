export enum SCREEN {
  X = 1600,
  Y = 800,
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
