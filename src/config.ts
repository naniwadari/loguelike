export enum SCREEN {
  X = 1600,
  Y = 800,
}

export enum Direction {
  top = 0,
  topRight = 1,
  right = 2,
  bottomRight = 3,
  bottom = 4,
  bottomLeft = 5,
  left = 6,
  topLeft = 7,
}

export enum FadeConf {
  blackout = 500,
  blackoutRatio = 100,
  whiteout = 1000,
  whiteoutRatio = 200,
  inTimeShort = 1700,
  outTimeShort = 500,
  fadeRatio = 1000, //ミリ秒を割って透明度を変化させるため、その子数
  fastFadeRatio = 500,
  interval = 20, //何ミリ秒ごとに実行するかの指定
}

export enum EnemyConf {
  popInitMin = 0,
  popInitMax = 2,
  //モンスターの視野
  fieldOfView = 5,
}

export enum MessageLength {
  limit = 8,
}

export enum MessageType {
  normal = 0,
  special = 1,
  danger = 2,
}

export enum FloorConf {
  width = 40,
  height = 40,
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
  distance_x = 5,
  distance_y = 5,
}

export enum TyleSize {
  x = 53.3,
  y = 53.3,
}

export enum DrawRange {
  x = 15,
  y = 15,
}

export const CanStand: boolean[] = [];
CanStand[MapType.floor] = true;
CanStand[MapType.wall] = false;
CanStand[MapType.downstair] = true;
