import MoveEvent from "./event/MoveEvent";
import { S } from "./State";
import { con, draw } from "./draw/Draw";
import ArrowKeyEvents from "./key/ArrowKeyEvents";
import Player from "./player/player";
import { Message, MessageList } from "./text/messages";
import { TEXT } from "./text/text";
import { MessageType } from "./config";
import Debug from "./debug/Debug";
import { firstFloor } from "./floor/floorModel/firstFloor";

// 決定キーを押すとinitイベントが走る
export function init() {
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

//キーボードイベント
ArrowKeyEvents();

/* プレイヤー移動イベント */
MoveEvent();

//デバッグ
Debug();
