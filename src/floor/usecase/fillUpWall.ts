import { IBlock, ISize } from "../../Types";
import { MapType } from "../../config";
import { Floor } from "../Floor";

export default (floor: Floor, blocks: IBlock[][]) => {
  for (let i = 0; i <= floor.size.width; i++) {
    blocks[i] = [];
    for (let j = 0; j <= floor.size.height; j++) {
      blocks[i][j] = { base: MapType.wall };
    }
  }
  return blocks;
};
