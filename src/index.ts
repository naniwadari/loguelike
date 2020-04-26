import MoveEvent from "./MoveEvent";
import { S } from "./State";
import { con, draw } from "./Draw";
import ArrowKeyEvents from "./ArrowKeyEvents";
import { createField } from "./createField";
import Player from "./player";
import { Message } from "./messages";
import { TEXT } from "./text";
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
