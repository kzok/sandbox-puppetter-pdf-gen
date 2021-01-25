# sandbox-pupetter-pdf-gen

![Node.js CI](https://github.com/kzok/sandbox-puppetter-pdf-gen/workflows/Node.js%20CI/badge.svg)

puppetter を使って PDF 生成してみる

## TODO

- [x] puppetter を使って指定サイトの pdf を生成するサーバを作成
  - [x] Helloworld 返すだけの HTTP サーバを立てる
  - [x] ロギングする
  - [x] SIGTERM で graceful close する
  - [x] 適当なページの PDF を返すようにする
  - [x] puppetter で開くタブに上限を設ける
    - [async-sema](https://github.com/vercel/async-sema) 使う
- [ ] ベンチマークの様子を見ながらいろいろ試してみる
  - [ ] puppetter インスタンスを再利用するかどうかで変化するか？
  - [ ] タブを再利用するかどうかで変化するか？

## Benchmark

<details>
<summary>その都度ブラウザを立ち上げる場合</summary>

```
> ab -n 100 -c 100 http://localhost:10666/

TODO: web サーバを自前のものに向けなおしてから実行しなおす
```

</details>
