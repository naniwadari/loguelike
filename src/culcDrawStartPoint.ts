import { S } from "./State";
import { DrawRange } from "./config";

export default () => {
  let drawStartPoint = { x: 0, y: 0 };
  // 描画を開始するX座標を計算
  //プレイヤーのxが描画範囲の半分以内なら始点は0
  if (S.player.x <= Math.floor(DrawRange.x / 2)) {
    drawStartPoint.x = 0;
  }
  //画面描画が右端で止まるところを始点とする
  else if (S.player.x >= S.fieldSize.x - Math.floor(DrawRange.x / 2)) {
    drawStartPoint.x = S.fieldSize.x - DrawRange.x;
  } else {
    drawStartPoint.x = S.player.x - Math.floor(DrawRange.x / 2);
  }

  //描画を開始するY座標を計算
  if (S.player.y <= Math.floor(DrawRange.y / 2)) {
    drawStartPoint.y = 0;
  } else if (S.player.y >= S.fieldSize.y - Math.floor(DrawRange.y / 2)) {
    drawStartPoint.y = S.fieldSize.y - DrawRange.y;
  } else {
    drawStartPoint.y = S.player.y - Math.floor(DrawRange.y / 2);
  }
  return drawStartPoint;
};
