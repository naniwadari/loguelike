"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jssha_1 = __importDefault(require("jssha"));
function hash(seed) {
    let sha256 = new jssha_1.default("SHA-256", "TEXT");
    sha256.update(seed);
    // ハッシュ化した文字列を16進数に変換
    return sha256.getHash("HEX");
}
class RandomSeed {
    constructor(seed) {
        this.seed = seed;
        this.hash = hash(seed);
        this.pointer = 0;
    }
    byte() {
        if (this.pointer === 64) {
            this.hash = hash(this.hash);
            this.pointer = 0;
        }
        // 1バイト分切り取る(16進数 最大255)
        const value = this.hash.substring(this.pointer, this.pointer + 2);
        this.pointer += 2;
        // 16進数を整数値にして戻す
        return parseInt(value, 16);
    }
    num(max) {
        if (max <= 0) {
            throw new Error("0以上の引数を指定してください");
        }
        else if (max <= 256) {
            //最大値でbyte()の計算結果を割った余りを返す
            return this.byte() % max;
        }
        else {
            throw new Error("not supported");
        }
    }
    fraction() {
        //0から1までの少数をランダムに返す
        return this.byte() / 256;
    }
}
exports.RandomSeed = RandomSeed;
