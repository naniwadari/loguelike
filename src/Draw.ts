import { S } from "./State";
import { SCREEN } from "./config";
import culcDrawStartPoint from "./culcDrawStartPoint";
import drawDiagonalArrow from "./draw/drawDiagonalArrow";
import drawMessage from "./draw/drawMessage";
import { drawTyles } from "./draw/drawTyles";
import drawStatus from "./draw/drawStatus";
import drawEnemys from "./draw/drawEnemys";
import drawPlayer from "./draw/drawPlayer";
import drawTitle from "./draw/drawTitle";

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
  //プレイヤーの描画
  drawPlayer(con, playerDrawPoint);
  //モンスターの描画
  drawEnemys(con, drawStartPoint);
  //メッセージの描画
  drawMessage(con);
  //ステータスの描画
  drawStatus(con);
  //斜め移動の矢印の描画
  if (S.env.diagonal) {
    drawDiagonalArrow(con, playerDrawPoint);
  }
}
