import { TyleSize } from "../config";
import { Point } from "../Types";

const playerImg = new Image();
playerImg.src = "./src/image/character/player.png";
export default (con: any, playerDrawPoint: Point) => {
  con.textBaseline = "middle";
  con.textAlign = "center";
  con.fillStyle = "black";
  con.font = "24px consolas";
  const ratio = 1;
  const size_x = TyleSize.x * ratio;
  const size_y = TyleSize.y * ratio;
  const fix = (TyleSize.x * (1 - ratio)) / 2;
  con.drawImage(
    playerImg,
    0,
    0,
    64,
    64,
    playerDrawPoint.x * TyleSize.x + fix,
    playerDrawPoint.y * TyleSize.y + fix,
    size_x,
    size_y
  );
  // con.fillText(
  //   "@",
  //   playerDrawPoint.x * TyleSize.x + TyleSize.x / 2,
  //   playerDrawPoint.y * TyleSize.y + TyleSize.y / 2
  // );
};
