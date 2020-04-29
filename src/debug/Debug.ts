import { S } from "../State";
import { Point } from "../Types";
import { MapType } from "../config";
import { draw, con } from "../draw/Draw";
import CreateFloor from "../floor/CreateFloor";
import getOffFloor from "../event/getOffFloor";
export default () => {
  window.addEventListener("keydown", (e) => {
    // デバッグキー P
    if (e.keyCode === 80) {
      searchDownstairsPoint();
      searchEnemysPoint();
    }
    // マップリクリエイトキー　0
    else if (e.keyCode === 48) {
      mapRecreate();
    }
  });
};
function mapRecreate() {
  getOffFloor();
  draw(con, S.env);
}
function forceGameOver() {
  S.player.HP = 0;
  S.Frag.gameover = true;
  console.log("強制ゲームオーバー");
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
    console.log(enemys[i].point);
  }
}
