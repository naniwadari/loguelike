import { TyleSize } from "../config";
import { Point } from "../Types";

export default (con: any, playerDrawPoint: Point) => {
  con.textBaseline = "middle";
  con.textAlign = "center";
  con.fillStyle = "black";
  con.font = "24px consolas";
  con.fillText(
    "@",
    playerDrawPoint.x * TyleSize.x + TyleSize.x / 2,
    playerDrawPoint.y * TyleSize.y + TyleSize.y / 2
  );
};
