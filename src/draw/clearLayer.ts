import { TEXT } from "../text/text";
import { DrawRange, TyleSize } from "../config";
import { S } from "../State";

export default (layer: CanvasRenderingContext2D) => {
  layer.save();
  let size = { x: TyleSize.x * DrawRange.x, y: TyleSize.y * DrawRange.y };
  layer.globalAlpha = 1;
  layer.clearRect(0, 0, size.x, size.y);
  layer.restore();
};
