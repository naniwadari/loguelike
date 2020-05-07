import { S } from "../State";
import { draw, con } from "../draw/Draw";
import getOffFloor from "../event/getOffFloor";
import { layerIn, layer } from "../draw/LayerDraw";
import { Weapon } from "../item/Weapon";
import { ItemId } from "../config/item";
import { Shield } from "../item/Shield";
import { Potion } from "../item/Potion";
export default () => {
  window.addEventListener("keydown", (e) => {
    // デバッグキー P
    if (e.keyCode === 80) {
      checkState();
    }
    // マップリクリエイトキー　0
    else if (e.keyCode === 48) {
      getOffFloor();
      draw(con, S.env);
    }
  });
};

function mapRecreate() {
  getOffFloor();
  draw(con, S.env);
}

function fillItem() {
  let weapon = new Weapon(ItemId.club);
  let shield = new Shield(ItemId.leatherShield);
  let herb = new Potion(ItemId.greenHerb);
  S.bags.store(weapon);
  S.bags.store(shield);
  S.bags.store(herb);
  draw(con, S.env);
}

function checkState() {
  console.log(S);
}
function forceGameOver() {
  S.player.HP = 0;
  S.Frag.gameover = true;
  layerIn(layer, S.env);
  console.log("強制ゲームオーバー");
  console.log(S.Frag.gameover);
}

function searchDownstairsPoint() {
  const floor = S.floors[S.player.depth];
  let downStairsPoint = floor.downstair;
  console.log("階段の座標");
  console.log(downStairsPoint);
}
function searchEnemysPoint() {
  console.log("モンスターの座標");
  const enemys = S.enemys;
  for (let i = 0; i < enemys.length; i++) {
    console.log(enemys[i]);
  }
}
