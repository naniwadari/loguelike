import { ISize, IBlock, IGate } from "../Types";
import { MapType, Direction } from "../config";
import Room from "./Room";
import Dig from "./Dig";

export class Floor {
  size: ISize;
  rooms: Room[];
  gates: IGate[];

  constructor(floorSize: ISize, rooms: Room[], gates: IGate[]) {
    this.size = floorSize;
    this.rooms = rooms;
    this.gates = gates;
  }

  fillWall(blocks: IBlock[][]) {
    for (let i = 0; i <= this.size.width; i++) {
      blocks[i] = [];
      for (let j = 0; j <= this.size.height; j++) {
        blocks[i][j] = { base: MapType.wall };
      }
    }
  }

  digPaths(blocks: IBlock[][]) {
    for (let i = 0; i < this.gates.length; i++) {
      let gate = this.gates[i];
      if (
        gate.direction === Direction.left ||
        gate.direction === Direction.right
      ) {
        new Dig(gate.A, gate.B).sideToside(blocks);
      } else {
        new Dig(gate.A, gate.B).topTobottom(blocks);
      }
    }
  }
}
