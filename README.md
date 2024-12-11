# 概要

ろーぐらいくは いわゆる不思議のダンジョンシリーズのような、ランダム生成されたダンジョンを冒険するゲームです。
HTML5 の canvas 要素を利用して描画を行っています。

## URL
https://naniwadari.github.io/loguelike/

## インフラ

- TypeScript
- WebPack
- Jest

## 技術的ポイント

- 二次元配列によるマップ・オブジェクトの位置の表現
- State ファイルによるゲームステータス・フラグ管理
- Jest による単体テスト
- ランダムフロア生成の制約をクリアしたアルゴリズム(フロアをはみ出さない、壁を１マス設ける、通路を必ずつなげる等)
- 敵の行動の表現( プレイヤーを見つけたら最短距離で追いかける、壁があったら迂回を試みる、など)

## 今後の課題

- 設計の改善（複雑な依存性の排除）
- オブジェクトごとの目的、範囲を明確化する
