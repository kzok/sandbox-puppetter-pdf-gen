# sandbox-pupetter-pdf-gen

![Node.js CI](https://github.com/kzok/sandbox-puppetter-pdf-gen/workflows/Node.js%20CI/badge.svg)

puppetter を使って PDF 生成してみる

## TODO

- [ ] puppetter を使って指定サイトの pdf を生成するサーバを作成
  - [x] Helloworld 返すだけの HTTP サーバを立てる
  - [x] ロギングする
  - [x] SIGTERM で graceful close する
  - [x] 適当なページの PDF を返すようにする
  - [ ] puppetter で開くタブに上限を設ける
    - [async-sema](https://github.com/vercel/async-sema) 使う
- [ ] ベンチマークの様子を見ながらいろいろ試してみる
  - [ ] puppetter インスタンスを再利用するかどうかで変化するか？
  - [ ] タブを再利用するかどうかで変化するか？

## Benchmark

<details>
<summary>その都度ブラウザを立ち上げる場合</summary>

```
> ab -n 100 -c 10 http://localhost:10666/

Concurrency Level:      10
Time taken for tests:   7.314 seconds
Complete requests:      100
Failed requests:        0
Total transferred:      3579400 bytes
HTML transferred:       3566500 bytes
Requests per second:    13.67 [#/sec] (mean)
Time per request:       731.371 [ms] (mean)
Time per request:       73.137 [ms] (mean, across all concurrent requests)
Transfer rate:          477.94 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       0
Processing:   565  705 115.1    674    1030
Waiting:      564  703 114.2    673    1023
Total:        565  705 115.1    674    1030

Percentage of the requests served within a certain time (ms)
  50%    674
  66%    702
  75%    721
  80%    743
  90%    977
  95%   1006
  98%   1012
  99%   1030
 100%   1030 (longest request)
```

</details>
