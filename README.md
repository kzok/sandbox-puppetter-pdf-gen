# sandbox-pupetter-pdf-gen

![Node.js CI](https://github.com/kzok/sandbox-puppetter-pdf-gen/workflows/Node.js%20CI/badge.svg)

puppetter を使って PDF 生成してみる

## TODO

- [ ] puppetter を使って指定サイトの pdf を生成するサーバを作成
  - [ ] Helloworld 返すだけの HTTP サーバを立てる
  - [ ] 適当なページの PDF を返すようにする
  - [ ] puppetter で開くタブに上限を設ける
    - [async-sema](https://github.com/vercel/async-sema) 使う
  - [ ] 一応ロギングする
  - [ ] 一応 SIGTERM で graceful close する
- [ ] パフォーマンステストを追加
  - 手元の環境での比較検証しかしないので雑に 10k リクエスト送って終了するまでの時間を測定する
- [ ] パフォーマンステストの様子を見ながらいろいろ試してみる
  - [ ] 10k リクエストが来てもクラッシュしないようにする
  - [ ] puppetter インスタンスを再利用するかどうかで変化するか？
  - [ ] タブを再利用するかどうかで変化するか？
