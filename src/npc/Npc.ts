import { NpcType, NpcId } from "../config/npc";
import { IMessage, INpc, IState, IPoint } from "../Types";
import { Message } from "../text/messages";

export class Npc implements INpc {
  id: number;
  name: string;
  type: NpcType;
  serif: IMessage[];
  point: IPoint;
  spokenCount: number;

  constructor(id: NpcId, list: INpc[], point: IPoint) {
    let npc = findNpcById(id, list);
    this.id = npc.id;
    this.name = npc.name;
    this.type = npc.type;
    this.serif = npc.serif;
    this.point = point;
    this.spokenCount = 0;
  }

  spoken() {
    let serif = this.serif[this.spokenCount];
    //それ以上セリフが無かったら最後のセリフを繰り返す
    if (!serif) {
      serif = this.serif[this.serif.length - 1];
    }
    let shapeText = this.name + "「" + serif.text + "」";
    let msg = new Message(shapeText, serif.type);
    ++this.spokenCount;
    return msg;
  }
}

export function findNpcById(id: NpcId, list: INpc[]) {
  let result = list.filter((npc: INpc) => {
    return npc.id === id;
  });
  return result[0];
}
