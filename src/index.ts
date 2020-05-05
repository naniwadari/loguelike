import MoveEvent from "./event/MoveEvent";
import { S } from "./State";
import { con, draw } from "./draw/Draw";
import moveKey from "./key/moveKey";
import Player from "./player/player";
import { Message, MessageList } from "./text/messages";
import { TEXT } from "./text/text";
import { MessageType } from "./config";
import Debug from "./debug/Debug";
import { firstFloor } from "./floor/floorModel/firstFloor";
import { layerOut, layer } from "./draw/LayerDraw";
import actionKey from "./key/actionKey";
import menuKey from "./key/menuKey";

// 決定キーを押すとinitイベントが走る
export function init() {
  layerOut(layer, S.env);
  S.Frag.gameover = false;
  S.floors = [];
  S.player = new Player(12, 12);
  S.enemys = [];
  S.messages = new MessageList();
  S.floors[0] = firstFloor;
  console.log(S.floors);
  S.messages.add(new Message(TEXT.init, MessageType.special));
}

//画面描画
draw(con, S.env);

//移動キー
moveKey();
//アクションキー
actionKey();
//メニューキー
menuKey();
/* プレイヤー移動イベント */
MoveEvent();

//デバッグ
Debug();
