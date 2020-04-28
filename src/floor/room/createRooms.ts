import { ISize, IPoint } from "../../Types";
import { RoomConf } from "../../config";
import { Random } from "../../module/Random";
import Room from "./Room";

//条件にあった部屋を作り出して配列を返す
export default (lim: number, floorSize: ISize) => {
  let rooms: Room[] = [];
  let successCount: number = 0;
  for (let i = 0; i < lim; i++) {
    const size = randomRoomSize();
    const startPoint = randomRoomStartPoint(floorSize);
    const newRoom = new Room(startPoint, size);
    if (newRoom.isNoDuplicate(rooms) && newRoom.isInFloor(floorSize)) {
      newRoom.index = successCount;
      successCount++;
      rooms.push(newRoom);
    }
  }
  return rooms;
};

//ランダムに部屋のサイズを返す
function randomRoomSize() {
  const width = Random.rangeInt(RoomConf.minWidth, RoomConf.maxWidth);
  const height = Random.rangeInt(RoomConf.minHeight, RoomConf.maxHeight);
  const size: ISize = { width: width, height: height };
  return size;
}

//ランダムに部屋の左上の座標を返す
function randomRoomStartPoint(floorSize: ISize) {
  //ランダムで座標を生成
  const x = Random.rangeInt(1, floorSize.width);
  const y = Random.rangeInt(1, floorSize.height);
  const point: IPoint = { x: x, y: y };
  return point;
}
