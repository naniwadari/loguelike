import { Npc } from "@root/npc/Npc";
import { NpcId, NpcList } from "@root/config/npc";

/* モックデータ */
let point = { x: 1, y: 1 };
let npc = new Npc(NpcId.last, NpcList, point);

/* テスト */
describe("spoken", () => {
  test("should return collect message", () => {
    for (let i = 0; i < npc.serif.length; i++) {
      let result = npc.spoken();
      let serif = npc.name + "「" + npc.serif[i].text + "」";
      expect(result.text).toBe(serif);
    }
    //超過した場合
    let result = npc.spoken();
    let serif = npc.name + "「" + npc.serif[npc.serif.length - 1].text + "」";
    expect(result.text).toBe(serif);
  });
});
