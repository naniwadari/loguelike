import { Floor } from "../Floor";
import { MapType } from "../../config";

export default (floor: Floor) => {
  const point = floor.downstair;
  const blocks = floor.blocks;
  blocks[point.x][point.y].base = MapType.downstair;
  return blocks;
};
