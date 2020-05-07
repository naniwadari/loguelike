import { MessageType } from "../config";
import { Message } from "./messages";

export module Serif {
  /* 最初のフロア */
  export const first1 = {
    text: "降りるとダンジョン始まるよ",
    type: MessageType.normal,
  };
  export const first2 = {
    text: "頑張ってね",
    type: MessageType.normal,
  };
  export const first3 = {
    text: "降りないとはじまらないよ",
    type: MessageType.normal,
  };
  export const first4 = {
    text: "はやくいきな",
    type: MessageType.normal,
  };
  export const first5 = {
    text: "・・・",
    type: MessageType.normal,
  };
  /* クリアフロア */
  export const last1 = {
    text: "おめでとう、クリアです！",
    type: MessageType.normal,
  };
  export const last2 = {
    text: "もうなにもないよ 1回目",
    type: MessageType.normal,
  };
  export const last3 = {
    text: "もうなにもないよ 2回目",
    type: MessageType.normal,
  };
  export const last4 = {
    text: "もうなにもないよ 3回目",
    type: MessageType.normal,
  };
  export const last5 = { text: "しつこい", type: MessageType.normal };
}
