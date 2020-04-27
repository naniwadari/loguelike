import { TEXT } from "../text/text";
import { SCREEN } from "../config";

export default (con: any) => {
  con.textBaseline = "alphabetic";
  con.textAlign = "center";
  con.fillStyle = "white";

  con.font = "48px consolas";
  con.fillText(TEXT.title, SCREEN.X / 2, SCREEN.Y / 4);

  con.font = "32px consolas";
  con.fillText("> " + TEXT.start, SCREEN.X / 2, (SCREEN.Y / 4) * 3);
};
