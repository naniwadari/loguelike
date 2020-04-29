import Dig from "../Dig";
import { IBlock } from "../../Types";
import { Floor } from "../Floor";

export default (floor: Floor, blocks: IBlock[][]) => {
  for (let i = 0; i < floor.rooms.length; i++) {
    let room = floor.rooms[i];
    blocks = new Dig(room.start, room.end).square(blocks);
  }
  return blocks;
};
