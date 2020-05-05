import { KeyCode } from "../KeyCode";
import { IState } from "../../Types";
import { S } from "../../State";
import { draw, con } from "../../draw/Draw";
export default () => {
  window.addEventListener("keydown", (e) => {
    if (!S.Frag.menu) {
      return;
    }
    if (e.keyCode === KeyCode.up) {
      upOnMenu(con, S);
      return;
    }
    if (e.keyCode === KeyCode.down) {
      downOnMenu(con, S);
      return;
    }
  });
};

function upOnMenu(con: any, S: IState) {
  if (S.bagCursor === 0) {
    return;
  }
  --S.bagCursor;
  draw(con, S.env);
  return;
}

function downOnMenu(con: any, S: IState) {
  if (S.bagCursor === S.bags.items.length - 1) {
    return;
  }
  ++S.bagCursor;
  draw(con, S.env);
  return;
}
