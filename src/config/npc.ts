import { INpc } from "../Types";
import { Serif } from "../text/serif";

export enum NpcId {
  first = 0,
  last = 999,
}

export enum NpcType {
  normal = 0,
}

export const NpcList: INpc[] = [
  {
    id: NpcId.first,
    type: NpcType.normal,
    name: "ダイヤくん",
    serif: [
      Serif.first1,
      Serif.first2,
      Serif.first3,
      Serif.first4,
      Serif.first5,
    ],
  },
  //最後
  {
    id: NpcId.last,
    type: NpcType.normal,
    name: "ダイヤくん",
    serif: [Serif.last1, Serif.last2, Serif.last3, Serif.last4, Serif.last5],
  },
];
