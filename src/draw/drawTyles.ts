import { DrawRange, TyleSize, MapType } from "../config";
import { Point } from "../Types";
import { S } from "../State";

//階段などのイメージ
const structureImg = new Image();
structureImg.src = "./src/image/GBstructure.png";
//床のイメージ
const tyleImg = new Image();
tyleImg.src = "./src/image/GBtyle.png";
//壁のイメージ
const wallImg = new Image();
wallImg.src = "./src/image/GBwall.png";

export function drawTyles(con: any, drawStartPoint: Point) {
  /* バグフロア */
  if (S.player.depth >= 11) {
    wallImg.src = "./src/image/mojibake.png";
    for (let i = 0; i < DrawRange.x; i++) {
      for (let j = 0; j < DrawRange.y; j++) {
        const block =
          S.floors[S.player.depth].blocks[drawStartPoint.x + i][
            drawStartPoint.y + j
          ];
        const tyleDrawPoint = { x: i, y: j };
        if (block.base === MapType.floor) {
          DrawTyle.bagTyle(con, tyleDrawPoint);
        } else if (block.base === MapType.wall) {
          DrawTyle.bagTyle2(con, tyleDrawPoint);
        } else if (block.base === MapType.downstair) {
          //下地
          DrawTyle.bagTyle3(con, tyleDrawPoint);
          DrawTyle.bagTyle(con, tyleDrawPoint);
        }
      }
    }
    return;
  }
  for (let i = 0; i < DrawRange.x; i++) {
    for (let j = 0; j < DrawRange.y; j++) {
      const block =
        S.floors[S.player.depth].blocks[drawStartPoint.x + i][
          drawStartPoint.y + j
        ];
      const tyleDrawPoint = { x: i, y: j };
      if (block.base === MapType.floor) {
        DrawTyle.floor(con, tyleDrawPoint);
      } else if (block.base === MapType.wall) {
        DrawTyle.wall(con, tyleDrawPoint);
      } else if (block.base === MapType.downstair) {
        //下地
        DrawTyle.floor(con, tyleDrawPoint);
        DrawTyle.downstair(con, tyleDrawPoint);
      }
    }
  }
}

export module DrawTyle {
  export function floor(con: any, point: Point) {
    con.drawImage(
      tyleImg,
      0,
      5 * 16,
      16,
      16,
      point.x * TyleSize.x,
      point.y * TyleSize.y,
      TyleSize.x,
      TyleSize.y
    );
  }

  export function wall(con: any, point: Point) {
    con.drawImage(
      wallImg,
      0,
      3 * 16,
      16,
      16,
      point.x * TyleSize.x,
      point.y * TyleSize.y,
      TyleSize.x,
      TyleSize.y
    );
  }

  export function downstair(con: any, point: Point) {
    con.drawImage(
      structureImg,
      1 * 16,
      1 * 16,
      16,
      16,
      point.x * TyleSize.x,
      point.y * TyleSize.y,
      TyleSize.x,
      TyleSize.y
    );
  }

  export function bagTyle(con: CanvasRenderingContext2D, point: Point) {
    con.drawImage(
      wallImg,
      0,
      32,
      32,
      32,
      point.x * TyleSize.x,
      point.y * TyleSize.y,
      TyleSize.x,
      TyleSize.y
    );
  }
  export function bagTyle2(con: CanvasRenderingContext2D, point: Point) {
    con.drawImage(
      wallImg,
      32,
      32,
      32,
      32,
      point.x * TyleSize.x,
      point.y * TyleSize.y,
      TyleSize.x,
      TyleSize.y
    );
  }
  export function bagTyle3(con: CanvasRenderingContext2D, point: Point) {
    con.drawImage(
      wallImg,
      0,
      64,
      32,
      32,
      point.x * TyleSize.x,
      point.y * TyleSize.y,
      TyleSize.x,
      TyleSize.y
    );
  }
}
