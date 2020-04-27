import { KeyCode } from "./KeyCode";
import { S } from "../State";
import { con, canvas, draw } from "../draw/Draw";
import { init } from "../index";

export default () => {
  // 移動キーが押されているか
  window.addEventListener("keydown", (e) => {
    if (e.keyCode === KeyCode.left) {
      S.KeyPress.left = true;
    } else if (e.keyCode === KeyCode.up) {
      S.KeyPress.up = true;
    } else if (e.keyCode === KeyCode.right) {
      S.KeyPress.right = true;
    } else if (e.keyCode === KeyCode.down) {
      S.KeyPress.down = true;
    } else {
      S.KeyPress.left = false;
      S.KeyPress.up = false;
      S.KeyPress.right = false;
      S.KeyPress.down = false;
    }
  });

  // 移動キーが離されたかどうか
  window.addEventListener("keyup", (e) => {
    if (e.keyCode === KeyCode.left) {
      S.KeyPress.left = false;
    } else if (e.keyCode === KeyCode.up) {
      S.KeyPress.up = false;
    } else if (e.keyCode === KeyCode.right) {
      S.KeyPress.right = false;
    } else if (e.keyCode === KeyCode.down) {
      S.KeyPress.down = false;
    }
  });

  // shiftキー
  window.addEventListener("keydown", (e) => {
    if (e.keyCode === KeyCode.shift) {
      if (!S.env.diagonal) {
        S.env.diagonal = true;
        draw(con, S.env);
      }
      return;
    }
  });

  // シフトを押しているかどうか
  window.addEventListener("keyup", (e) => {
    if (e.keyCode === KeyCode.shift) {
      if (S.env.diagonal) {
        S.env.diagonal = false;
        draw(con, S.env);
      }
    }
  });

  /* Zキー */
  window.addEventListener("keydown", (e) => {
    //タイトル画面での操作
    if (!S.Frag.start) {
      if (e.keyCode === KeyCode.action) {
        S.Frag.start = true;
        init();
        draw(con, S.env);
      }
      return;
    }
    //ゲームオーバー時の操作
    if (S.Frag.gameover) {
      if (e.keyCode === KeyCode.action) {
        S.Frag.start = false;
        draw(con, S.env);
      }
      return;
    }
  });

  // ブラウザ以外を見ているとき
  window.addEventListener("blur", (e) => {
    if (S.env.diagonal) {
      S.env.diagonal = false;

      draw(con, S.env);
    }
  });
};
