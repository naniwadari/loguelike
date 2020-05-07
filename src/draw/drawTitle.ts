import { TEXT } from "../text/text";
import { DrawRange, TyleSize } from "../config";

export default (con: any) => {
  const size_x = DrawRange.x * TyleSize.x;
  const size_y = DrawRange.y * TyleSize.y;
  con.textBaseline = "alphabetic";
  con.textAlign = "center";
  con.fillStyle = "white";

  con.font = "48px consolas";
  con.fillText(TEXT.title, size_x / 2, size_y / 4);

  con.font = "32px consolas";
  con.fillText("> " + TEXT.start, size_x / 2, (size_y / 4) * 3);
};
