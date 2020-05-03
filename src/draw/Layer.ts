import { TEXT } from "../text/text";
import { DrawRange, TyleSize } from "../config";
import { S } from "../State";

export module Layer {
  export const size = {
    x: TyleSize.x * DrawRange.x,
    y: TyleSize.y * DrawRange.y,
  };

  export function eyecatch(layer: CanvasRenderingContext2D, alpha: number) {
    layer.save();
    layer.globalAlpha = alpha;
    layer.textBaseline = "alphabetic";
    layer.textAlign = "center";
    layer.fillStyle = "white";
    layer.font = "48px layersolas";
    layer.fillText(
      "お試しダンジョン" + "　" + `${S.player.depth}F`,
      size.x / 2,
      size.y / 3
    );
    layer.restore();
  }

  export function background(layer: CanvasRenderingContext2D, alpha: number) {
    layer.save();
    //描画されていた範囲のリセット
    layer.clearRect(0, 0, size.x, size.y);
    layer.globalAlpha = alpha;
    layer.fillRect(0, 0, size.x, size.y);
  }

  export function clear(layer: CanvasRenderingContext2D) {
    layer.save();
    layer.globalAlpha = 1;
    layer.clearRect(0, 0, size.x, size.y);
    layer.restore();
  }
}
