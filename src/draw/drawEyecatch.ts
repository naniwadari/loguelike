import { TEXT } from "../text/text";
import { DrawRange, TyleSize } from "../config";
import { S } from "../State";

export default (layer: CanvasRenderingContext2D, alpha: number) => {
  layer.save();
  let size = { x: TyleSize.x * DrawRange.x, y: TyleSize.y * DrawRange.y };
  //描画されていた範囲のリセット
  layer.clearRect(0, 0, size.x, size.y);
  layer.globalAlpha = alpha;
  layer.fillRect(0, 0, size.x, size.y);
  layer.textBaseline = "alphabetic";
  layer.textAlign = "center";
  layer.fillStyle = "white";
  layer.font = "48px layersolas";
  layer.fillText(
    "お試しダンジョン" + "　" + `${S.player.depth}F`,
    size.x / 2,
    size.y / 2
  );
  layer.restore();
};
