import { DrawRange, TyleSize } from "../config";
import { TextConf, FontConf } from "../config/draw";
import { IState } from "../Types";
import { ItemConf } from "../config/item";

export function drawBag(con: CanvasRenderingContext2D, S: IState) {
  let items = S.bags.items;
  let bagCursor = S.bagCursor;
  let margin = TextConf.margin;
  let cursor = TextConf.cursorSize;
  let lineheight = TextConf.lineheight;
  let statusHeight = 30 * 6 + 8;
  let height = margin + (24 + lineheight) * ItemConf.bagMax + margin * 2;
  let width = 230;
  let rectStart = {
    x: DrawRange.x * TyleSize.x + margin,
    y: statusHeight + margin * 3,
  };
  con.save();
  con.strokeStyle = "white";
  con.strokeRect(rectStart.x, rectStart.y, width, height);
  con.restore;

  con.save();
  con.textBaseline = "top";
  con.textAlign = "left";
  con.translate(rectStart.x + margin, rectStart.y + margin);
  for (let i = 0; i < items.length; i++) {
    let text = items[i].item.name;
    let x = margin + cursor + cursor;
    if (S.player.weapon) {
      if (S.player.weapon.index === i) {
        text = "E" + items[i].item.name;
        x = margin + cursor;
      }
    }
    if (S.player.shield) {
      if (S.player.shield.index === i) {
        text = "E" + items[i].item.name;
        x = margin + cursor;
      }
    }
    con.fillStyle = "white";
    con.font = FontConf.L;
    con.fillText(text, x, (24 + lineheight) * i + 8);
  }
  con.restore();

  if (S.Frag.menu) {
    con.save();
    con.font = FontConf.L;
    con.fillStyle = "white";
    con.translate(rectStart.x + margin * 2, rectStart.y + margin * 2);
    con.fillText(">", 0, (24 + lineheight) * bagCursor + 8);
    con.restore();
  }
}
