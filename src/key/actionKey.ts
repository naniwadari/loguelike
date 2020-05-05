import { S } from "../State";
import { KeyCode } from "./KeyCode";
import { init } from "../index";
import { draw, con } from "../draw/Draw";
import { layerOut, layer } from "../draw/LayerDraw";
import { IState } from "../Types";

export default () => {
  /* アクションキー */
  window.addEventListener("keydown", (e) => {
    if (e.keyCode === KeyCode.action) {
      //タイトル画面での操作
      if (!S.Frag.start) {
        titleScene(S, con);
      }
      //ゲームオーバー時の操作
      if (S.Frag.gameover) {
        gameoverScene(S, con, layer);
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
