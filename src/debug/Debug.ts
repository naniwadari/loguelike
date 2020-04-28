import { S } from "../State";
import { Point } from "../Types";
import { MapType } from "../config";
import { draw, con } from "../draw/Draw";
import CreateFloor from "../floor/CreateFloor";
export default () => {
  window.addEventListener("keydown", (e) => {
    // デバッグキー P
    if (e.keyCode === 80) {
      searchDownstairsPoint();
      searchEnemysPoint();
    }
    // 強制ゲームオーバーキー 0
    else if (e.keyCode === 48) {
      mapRecreate();
    }
  });
};
function mapRecreate() {
  S.fields[S.player.depth].blocks = CreateFloor({ width: 25, height: 25 });
  draw(con, S.env);
}
function forceGameOver() {
  S.player.HP = 0;
  S.Frag.gameover = true;
  console.log("強制ゲームオーバー");
}

function searchDownstairsPoint() {
  const field = S.fields[S.player.depth];
  let downStairsPoint: Point = { x: 0, y: 0 };
  for (let i = 0; i < field.blocks.length; i++) {
    for (let j = 0; j < field.blocks.length; j++) {
      let targetBlock = field.blocks[i][j];
      if (targetBlock.base === MapType.downstair) {
        downStairsPoint = { x: i, y: j };
        break;
      }
    }
  }
  console.log("階段の座標");
  console.log(downStairsPoint);
}
function searchEnemysPoint() {
  console.log("モンスターの座標");
  const enemys = S.fields[S.player.depth].enemys;
  for (let i = 0; i < enemys.length; i++) {
    console.log(enemys[i].point);
  }
}
