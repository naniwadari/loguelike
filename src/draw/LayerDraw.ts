import { FadeConf } from "../config";
import { S } from "../State";
import { Layer } from "./Layer";

export const canvas = <HTMLCanvasElement>document.getElementById("layer");
export const layer = canvas.getContext("2d");

export async function layerIn(layer: any, env: any) {
  if (S.Frag.eyecatch) {
    await blackout(layer);
    await fadeIn(layer);
    return;
  }
  return;
}

export async function layerOut(layer: any, env: any) {
  if (S.Frag.eyecatch) {
    S.Frag.eyecatch = false;
    await whiteout(layer);
    Layer.clear(layer);
    return;
  }
  return;
}

export async function whiteout(layer: CanvasRenderingContext2D) {
  let start = Date.now();
  let settime = FadeConf.whiteout;
  let ratio = FadeConf.whiteoutRatio;
  return new Promise((resolve) => {
    let timer = setInterval(() => {
      let passed = calcPassedTime(start);
      let alpha = calcOutAlpha(passed, ratio);
      //規定時間が過ぎたら処理終了
      if (passed >= settime) {
        clearInterval(timer);
        return resolve();
      }
      Layer.background(layer, alpha);
      Layer.eyecatch(layer, alpha);
    });
  });
}

export async function blackout(layer: CanvasRenderingContext2D) {
  let start = Date.now();
  let settime = FadeConf.blackout;
  let ratio = FadeConf.blackoutRatio;
  return new Promise((resolve) => {
    let timer = setInterval(() => {
      let passed = calcPassedTime(start);
      let alpha = calcInAlpha(passed, ratio);
      //規定時間が過ぎたら処理終了
      if (passed >= settime) {
        clearInterval(timer);
        return resolve();
      }
      Layer.background(layer, alpha);
    });
  });
}

export function calcFadeElement(start: number, ratio: number) {
  let passed = calcPassedTime(start);
  let alpha = passed / ratio;
  return { passed: passed, alpha: alpha };
}

export async function fadeIn(layer: any) {
  let start = Date.now();
  let inTime = FadeConf.inTimeShort;
  let ratio = FadeConf.fadeRatio;
  let interval = FadeConf.interval;

  return new Promise((resolve) => {
    let timer = setInterval(() => {
      let passed = calcPassedTime(start);
      let alpha = calcInAlpha(passed, ratio);
      //規定時間が過ぎたらレイヤーをクリアして処理終了
      if (passed >= inTime) {
        clearInterval(timer);
        return resolve();
      }
      Layer.eyecatch(layer, alpha);
      console.log(alpha);
    }, interval);
  });
}

export async function fadeOut(layer: any) {
  let start = Date.now();
  let inTime = FadeConf.outTimeShort;
  let ratio = FadeConf.fastFadeRatio;
  let interval = FadeConf.interval;

  return new Promise((resolve) => {
    let timer = setInterval(() => {
      let passed = calcPassedTime(start);
      let alpha = calcOutAlpha(passed, ratio);
      if (alpha <= 0) alpha = 0;
      //規定時間が過ぎたらレイヤーをクリアして処理終了
      if (passed >= inTime) {
        clearInterval(timer);
        return resolve();
      }
      console.log(alpha);
      Layer.clear(layer);
      Layer.eyecatch(layer, alpha);
    }, interval);
  });
}

export function calcPassedTime(start: number) {
  let passed = Date.now() - start;
  return passed;
}

export function calcInAlpha(passed: number, ratio: number) {
  let alpha = passed / ratio;
  if (alpha >= 1) alpha = 1;
  return alpha;
}

export function calcOutAlpha(passed: number, ratio: number) {
  let alpha = 1 - passed / ratio;
  if (alpha <= 0) alpha = 0;
  return alpha;
}
