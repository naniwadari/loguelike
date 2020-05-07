import { S } from "../State";
import { TEXT } from "../text/text";
import { MessageType, FloorConf } from "../config";
import { Message } from "../text/messages";
import CreateFloor from "../floor/CreateFloor";
import { ISize } from "../Types";
import popEnemy from "../enemy/popEnemy";
import popItem from "../item/popItem";

export default () => {
  S.player.stairDown(S.floors[S.player.depth]);
  S.messages.add(new Message(TEXT.downstair, MessageType.normal));
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
