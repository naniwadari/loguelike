import { S } from "../State";
import { TEXT } from "../text/text";
import { MessageType, FloorConf } from "../config";
import { Message } from "../text/messages";
import CreateFloor from "../floor/CreateFloor";
import { ISize } from "../Types";
import popEnemy from "../enemy/popEnemy";
import popItem from "../item/popItem";
import { lastFloor } from "../floor/floorModel/lastFloor";
import { Npc } from "../npc/Npc";
import { NpcId, NpcList } from "../config/npc";

export default () => {
  S.player.stairDown();
  if (S.player.depth === 10) {
    S.floors = [];
    S.enemys = [];
    S.floors[S.player.depth] = lastFloor;
    S.player.x = 7;
    S.player.y = 12;
    let npcPoint = { x: 7, y: 4 };
    let lastNpc = new Npc(NpcId.last, NpcList, npcPoint);
    S.npcs.push(lastNpc);
  }
  if (S.player.depth === 11) {
    S.messages.add(new Message(TEXT.downstair_a, MessageType.danger));
    S.Frag.another = true;
  } else {
    S.messages.add(new Message(TEXT.downstair, MessageType.normal));
  }
  if (!S.floors[S.player.depth]) {
    const floorSize: ISize = {
      width: FloorConf.width,
      height: FloorConf.height,
    };
    let floor = CreateFloor(floorSize);
    //フロアステートの更新
    S.floors[S.player.depth] = floor;
    //プレイヤーの位置更新
    let playerPoint = floor.coordinateCanStand();
    S.player.x = playerPoint.x;
    S.player.y = playerPoint.y;
    //NPCのリセット
    S.npcs = [];
    //モンスターのリセット
    S.enemys = [];
    //モンスターのイニシャライズ
    S.enemys = popEnemy(floor);
    //アイテムの生成
    S.fallItems = popItem(floor);
  }
};
