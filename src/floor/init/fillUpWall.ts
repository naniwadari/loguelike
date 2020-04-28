import { IBlock, ISize } from "../../Types";
import { MapType } from "../../config";

export default (floorSize: ISize) => {
  let blocks: IBlock[][] = [];
  for (let i = 0; i <= floorSize.width; i++) {
    blocks[i] = [];
    for (let j = 0; j <= floorSize.height; j++) {
      blocks[i][j] = { base: MapType.wall };
    }
  }
  return blocks;
};
