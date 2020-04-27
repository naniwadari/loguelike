import { TEXT } from "../text/text";
import { TyleSize, DrawRange } from "../config";
import { S } from "../State";

function fillStatusText(con: any, text: string, lineNum: number) {
  con.fillText(text, 8, (24 + 6) * lineNum + 8);
}
export default (con: any) => {
  //ステータスメッセージの定義
  const depth = S.player.depth + TEXT.depth;
  const level = TEXT.level + ":" + S.player.level;
  const HP = TEXT.hp + ":" + S.player.HP + "/" + S.player.totalHP;
  const ATK = TEXT.ATK + ":" + S.player.ATK;
  const DEF = TEXT.DEF + ":" + S.player.DEF;
  const EXP = TEXT.EXP + ":" + S.player.EXP + "/" + S.player.requireEXP;

  con.save();
  con.textBaseline = "top";
  con.textAlign = "left";
  con.font = "24px consolas";
  con.fillStyle = "white";
  con.translate(DrawRange.x * TyleSize.x, 0);
  fillStatusText(con, depth, 0);
  fillStatusText(con, level, 1);
  fillStatusText(con, HP, 2);
  fillStatusText(con, ATK, 3);
  fillStatusText(con, DEF, 4);
  fillStatusText(con, EXP, 5);
  con.restore();
};
