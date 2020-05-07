import { IPoint, IState } from "../Types";
import { DrawRange, TyleSize } from "../config";
import { Npc } from "../npc/Npc";
import { NpcType } from "../config/npc";

export default (
  S: IState,
  con: CanvasRenderingContext2D,
  drawStartPoint: IPoint
) => {
  con.textBaseline = "middle";
  con.textAlign = "center";
  let npcs = S.npcs;
  for (let i = 0; i < npcs.length; i++) {
    let npc = npcs[i];
    if (
      npc.point.x >= drawStartPoint.x &&
      npc.point.x < drawStartPoint.x + DrawRange.x &&
      npc.point.y >= drawStartPoint.y &&
      npc.point.y < drawStartPoint.y + DrawRange.y
    ) {
      drawNpc(con, npc, drawStartPoint);
    }
  }
};

let npcImg = new Image();
npcImg.src = "./src/image/jewel32*32.png";
function drawNpc(
  con: CanvasRenderingContext2D,
  npc: Npc,
  drawStartPoint: IPoint
) {
  const type = npc.type;
  if (type === NpcType.normal) {
    const ratio = 1;
    const size_x = TyleSize.x * ratio;
    const size_y = TyleSize.y * ratio;
    const fix = (TyleSize.x * (1 - ratio)) / 2;
    const point = npc.point;
    con.drawImage(
      npcImg,
      0,
      32,
      32,
      32,
      (point.x - drawStartPoint.x) * TyleSize.x + fix,
      (point.y - drawStartPoint.y) * TyleSize.y + fix,
      size_x,
      size_y
    );
  }
}
