import { S } from "../State";
import { KeyCode } from "./KeyCode";
import { init } from "../index";
import { draw, con } from "../draw/Draw";
import { layerOut, layer } from "../draw/LayerDraw";
import { IState } from "../Types";
import * as Bag from "../item/Bag";
import { ItemType } from "../config/item";
import { actionMsg } from "../text/text";
import { MessageType } from "../config";

export default () => {
  /* アクションキー */
  window.addEventListener("keydown", (e) => {
    if (e.keyCode === KeyCode.action) {
      //タイトル画面での操作
      if (!S.Frag.start) {
        titleScene(S, con);
        return;
      }
      //ゲームオーバー時の操作
      if (S.Frag.gameover) {
        gameoverScene(S, con, layer);
        return;
      }
      //メニュー画面時の操作
      if (S.Frag.menu) {
        menuScene(S, con);
        return;
      }
    }
  });
};

export function gameoverScene(S: IState, con: any, layer: any) {
  S.Frag.start = false;
  layerOut(layer, S.env);
  draw(con, S.env);
  return;
}

export function titleScene(S: IState, con: any) {
  S.Frag.start = true;
  init();
  draw(con, S.env);
  return;
}

export function menuScene(S: IState, con: any) {
  let items = S.bags.items;
  let index = S.bagCursor;
  let bag = Bag.searchByIndex(items, index);
  let item = bag.item;
  console.log(bag);
  let equipMsg = { text: actionMsg.equip(item.name), type: MessageType.normal };
  let removeEquipMsg = {
    text: actionMsg.removeEquip(item.name),
    type: MessageType.normal,
  };
  let usePotionMsg = {
    text: actionMsg.usePotion(item.name, item.HP),
    type: MessageType.normal,
  };

  //武器
  if (item.types === ItemType.weapon) {
    //何も装備していない場合
    if (!S.player.weapon) {
      S.player.equip(bag);
      S.messages.add(equipMsg);
      draw(con, S.env);
      return;
    }
    //装備していて、かつその装備が選択したものだった場合
    if (S.player.weapon === bag) {
      S.player.removeEquip(bag);
      S.messages.add(removeEquipMsg);
      draw(con, S.env);
      return;
    }
    //装備していて、選択した装備が別のものだった場合
    S.player.removeEquip(S.player.weapon);
    S.player.equip(bag);
    S.messages.add(equipMsg);
    draw(con, S.env);
    return;
  }

  //盾
  if (item.types === ItemType.shield) {
    //何も装備していない場合
    if (!S.player.shield) {
      S.player.equip(bag);
      S.messages.add(equipMsg);
      draw(con, S.env);
      return;
    }
    //装備していて、かつその装備が選択した物だった場合
    if (S.player.shield === bag) {
      S.player.removeEquip(bag);
      S.messages.add(removeEquipMsg);
      draw(con, S.env);
      return;
    }
    S.player.removeEquip(S.player.shield);
    S.player.equip(bag);
    S.messages.add(equipMsg);
    draw(con, S.env);
    return;
  }

  //くすり
  if (item.types === ItemType.potion) {
    S.player.usePotion(bag);
    Bag.removeByIndex(items, bag.index);
    S.messages.add(usePotionMsg);
    draw(con, S.env);
    return;
  }
}
