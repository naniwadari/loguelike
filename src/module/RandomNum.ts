export module Random {
  //範囲内の整数をランダムに返す
  export function rangeInt(min: number, max: number) {
    const result = Math.floor(Math.random() * (max - min) + min);
    return result;
  }
}
