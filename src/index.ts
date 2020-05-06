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
import { Weapon } from "./item/Weapon";
import { ItemId } from "./config/item";
import onMenu from "./key/moveKey/onMenu";
import { Shield } from "./item/Shield";
import { Potion } from "./item/Potion";
import { cancelOnMenu } from "./key/cancelKey/onMenu";

// 決定キーを押すとinitイベントが走る
export function init() {
  //レイヤー処理を取り除く
  layerOut(layer, S.env);
  //フラグ関係の初期化
  S.Frag.gameover = false;
  //ステートの初期化
  S.floors = [];
  S.player = new Player(12, 12);
  S.enemys = [];
  S.messages = new MessageList();
  //フロアの生成とメッセージの追加
  S.floors[0] = firstFloor;
  S.messages.add(new Message(TEXT.init, MessageType.special));
  //初期アイテムの追加
  let initPotion = new Potion(ItemId.greenHerb);
  S.bags.store(initPotion);
}

//画面描画
draw(con, S.env);

//移動キー
moveKey();
//アクションキー
actionKey();
//メニューキー
menuKey();
onMenu();
//キャンセルキー
cancelOnMenu();
/* プレイヤー移動イベント */
MoveEvent();

//デバッグ
Debug();
