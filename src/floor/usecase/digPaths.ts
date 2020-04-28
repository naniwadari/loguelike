import Dig from "../Dig";
import { IBlock } from "../../Types";
import { Direction } from "../../config";
import { Floor } from "../Floor";

export default (floor: Floor, blocks: IBlock[][]) => {
  for (let i = 0; i < floor.gates.length; i++) {
    let gate = floor.gates[i];
    if (
      gate.direction === Direction.left ||
      gate.direction === Direction.right
    ) {
      blocks = new Dig(gate.A, gate.B).sideToside(blocks);
    } else {
      blocks = new Dig(gate.A, gate.B).topTobottom(blocks);
    }
  }
  return blocks;
};
