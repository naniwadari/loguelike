import { ISize, IBlock, IRoom } from "../Types";
import { Enemy } from "../enemy/Enemy";
import fillUpWalls from "./init/fillUpWall"
export class Floor {
  size: ISize;
  blocks: IBlock[][];
  rooms: IRoom[]
  enemys: Enemy;

  constructor(floorSize: ISize){
    this.size = floorSize
    this.blocks = 
  } 

  initBlocks(floorSize: ISize){
    let blocks: IBlocks[][] = []
    blocks = fillUpWalls(floorSize);
    blocks = 
  }
}