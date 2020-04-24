import {
  SCREEN,
  DrawRange,
  MessageLength,
  TyleSize,
  MessageType,
} from "../config";
import { S } from "../State";

export default (con: any) => {
  const messages = S.messages;
  con.save();
  con.textBaseline = "top";
  con.textAlign = "left";
  con.font = "16px consolas";
  con.translate(
    DrawRange.x * TyleSize.x,
    SCREEN.Y - ((16 + 6) * MessageLength.limit + 8 * 2)
  );
  for (let i = 0; i < messages.list.length; i++) {
    const type = messages.list[i].type;
    if (type === MessageType.normal) {
      con.fillStyle = "white";
    } else if (type === MessageType.special) {
      con.fillStyle = "yellow";
    } else if (type === MessageType.danger) {
      con.fillStyle = "red";
    } else {
      throw new Error("not supported");
    }
    con.fillText(messages.list[i].text, 8, (16 + 6) * i + 8);
  }
  con.restore();
};
