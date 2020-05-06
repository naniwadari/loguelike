import { S } from "../..//State";
import { KeyCode } from "../KeyCode";
import { IState } from "../..//Types";
import * as Bag from "../../item/Bag";
import { actionMsg } from "../..//text/text";
import { MessageType } from "../..//config";
import { draw, con } from "../..//draw/Draw";

export function cancelOnMenu() {
  window.addEventListener("keydown", (e) => {
    if (!S.Frag.menu) {
      return;
    }
    if (e.keyCode === KeyCode.cancel) {
      throwItem(S, con);
    }
  });
}

export function throwItem(S: IState, con: any) {
  if (S.bags.items.length === 0) {
    return;
  }
  let index = S.bagCursor;
  let items = S.bags.items;
  let item = Bag.searchByIndex(items, index);
  let throwMsg = {
    text: actionMsg.throwItem(item.item.name),
    type: MessageType.normal,
  };
  S.messages.add(throwMsg);
  S.bags.take(index);
  if (S.bagCursor === S.bags.items.length) {
    --S.bagCursor;
    if (S.bagCursor < 0) {
      S.bagCursor = 0;
    }
  }
  draw(con, S.env);
}
