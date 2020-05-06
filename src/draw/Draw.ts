import { S } from "../State";
import { SCREEN } from "../config";
import culcDrawStartPoint from "./culcDrawStartPoint";
import drawDiagonalArrow from "./drawDiagonalArrow";
import drawMessage from "./drawMessage";
import { drawTyles } from "./drawTyles";
import drawStatus from "./drawStatus";
import drawEnemys from "./drawEnemys";
import drawPlayer from "./drawPlayer";
import drawTitle from "./drawTitle";
import drawEyecatch from "./drawEyecatch";
import { drawBag } from "./drawBag";
import drawFallItem from "./drawFallItem";

export const canvas = <HTMLCanvasElement>document.getElementById("game");
export const con: any = canvas.getContext("2d");

export function draw(con: any, env: any) {
  con.fillStyle = "black";
  con.fillRect(0, 0, SCREEN.X, SCREEN.Y);

  if (!S.Frag.start) {
    drawTitle(con);
    return;
  }
  const drawStartPoint = culcDrawStartPoint();
  const playerDrawPoint = {
    x: S.player.x - drawStartPoint.x,
    y: S.player.y - drawStartPoint.y,
  };
  // タイルの描画
  drawTyles(con, drawStartPoint);
  //モンスターの描画
  drawEnemys(con, drawStartPoint);
  //メッセージの描画
  drawMessage(con);
  //ステータスの描画
  drawStatus(con);
  //バッグの中身の描画
  drawBag(con, S);
  //フロアに落ちているアイテムの描画
  drawFallItem(con, drawStartPoint);
  //プレイヤーの描画
  drawPlayer(con, playerDrawPoint);
  //斜め移動の矢印の描画
  if (S.env.diagonal) {
    drawDiagonalArrow(con, playerDrawPoint);
  }
}
