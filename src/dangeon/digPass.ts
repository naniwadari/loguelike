import { IPoint, blocks, MapType } from "./createFloor";

//通路を掘るためのメソッド群
export module Dig {
  // 通路を掘るメソッド群
  export function sideToside(A: IPoint, B: IPoint) {
    //通路を曲げるポイント
    const axisX = Math.floor(Math.abs(A.x + B.x) / 2);
    //掘り進めるポイント
    const AsidePassEnd: IPoint = { x: axisX, y: A.y };
    const BsidePassEnd: IPoint = { x: axisX, y: B.y };
    digSideWay(A, AsidePassEnd);
    digSideWay(B, BsidePassEnd);
    //両部屋から掘り進めた道をつなげる
    digVerticalWay(AsidePassEnd, BsidePassEnd);
  }

  export function topTobottom(A: IPoint, B: IPoint) {
    const axisY = Math.floor(Math.abs(A.y + B.y) / 2);
    const AverticalPassEnd: IPoint = { x: A.x, y: axisY };
    const BverticalPassEnd: IPoint = { x: B.x, y: axisY };
    digVerticalWay(A, AverticalPassEnd);
    digVerticalWay(B, BverticalPassEnd);
    digSideWay(AverticalPassEnd, BverticalPassEnd);
  }

  //床を縦に指定分掘る
  export function digVerticalWay(start: IPoint, end: IPoint) {
    //縦軸がずれてたら処理終了
    if (start.x !== end.x) {
      console.log("基準となる軸がずれています");
      return;
    }
    const axisX = start.x;
    if (start.y <= end.y) {
      for (let i = start.y; i <= end.y; i++) {
        blocks[axisX][i].base = MapType.floor;
      }
    } else {
      for (let i = end.y; i <= start.y; i++) {
        blocks[axisX][i].base = MapType.floor;
      }
    }
  }

  //床を横に指定分掘る
  export function digSideWay(start: IPoint, end: IPoint) {
    if (start.y !== end.y) {
      console.log("基準となる軸がずれています");
      return;
    }
    const fixedY = start.y;
    if (start.x <= end.x) {
      for (let i = start.x; i <= end.x; i++) {
        blocks[i][fixedY].base = MapType.floor;
      }
    } else {
      for (let i = end.x; i <= start.x; i++) {
        blocks[i][fixedY].base = MapType.floor;
      }
    }
  }
}
