import MoveEvent from "./MoveEvent";
import { S } from "./State";
import { con, draw } from "./draw/Draw";
import ArrowKeyEvents from "./key/ArrowKeyEvents";
import { createField } from "./createField";
import Player from "./player/player";
import { Message } from "./text/messages";
import { TEXT } from "./text/text";
import { MessageType } from "./config";
import Debug from "./debug/Debug";

// 決定キーを押すとinitイベントが走る
export function init() {
  S.Frag.gameover = false;

  S.fields[0] = createField(0, [], S.seed);
  const newPlayer = new Player(12, 12);
  S.player = newPlayer;
  S.messages.add(new Message(TEXT.init, MessageType.special));
}

//フィールド条件
draw(con, S.env);

//キーボードイベント
ArrowKeyEvents();

/* プレイヤー移動イベント */
MoveEvent();

//デバッグ
Debug();
