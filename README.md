# webpro_06

## このプログラムについて
このプログラムはNode.jsを用いてサーバーを立てるアプリケーションである.

## ファイル一覧
| ファイル名          | 説明                   |
|---------------------|------------------------|
| `app5.js`           | プログラム本体         |
| `views/show.ejs`    | 挨拶メッセージの表示用 |
| `views/icon.ejs`    | アイコン表示用         |
| `views/luck.ejs`    | おみくじ結果表示用     |
| `views/janken.ejs`  | じゃんけん結果表示用   |
| `public/janken.html`| じゃんけんの開始画面   |
| `views/gacha.ejs`   | ガチャ結果表示用       |
| `views/quiz.ejs`    | クイズ表示用           |



## 起動方法
**１．Githubからwebpro_06をクローンする**
ターミナル上で以下のコマンドを実行
```bash
 git clone https://github.com/SaToHaRuKu/webpro_06.git　
 ```

**２．npmのインストール**
ターミナル上でnpmのインストールを行う
```bash
install npm　
```
**３．サーバーの立ち上げ**
サーバーを立ち上げる
```bash
node app.5js 
```

**4.サイトへの接続**
それぞれの機能には以下のURLにブラウザでアクセスする

| URL |
|--------|
| 挨拶メッセージ: http://localhost:8080/hello1  |
| おみくじ: http://localhost:8080/luck  |
| じゃんけん: http://localhost:8080/janken  |
| ガチャ: http://localhost:8080/gacha  |
| クイズ: http://localhost:8080/quiz |

## git hubでの管理
**githubへのファイルの追加,変更**
githubにあるファイルを更新したい場合は,以下のコマンドを打ち込む.
```
git add .
git commit -am '更新内容を示すコメント'
git push
```

## 機能説明

## 1.挨拶メッセージ
- 挨拶のメッセージを表示するアプリケーションはapp5.js内のhello1とhello2がある.hello1とhello2の違いは情報の処理方法であり,返す値は同じである.
- 概要:フランス語と日本語での挨拶を表示する
- 使用方法:サイトにアクセスすると自動で表示される
- ファイル:view/show.ejs

#### プログラムの解説

app5.js内の引数であるconst massage1,const message2にHello world,Bon jour を代入する.

```bash
  const message1 = "Hello world";
  const message2 = "Bon jour";
```

show.ejsにmessage1,message2をgreet1,greet2としてする.

```bash
  res.render('show', { greet1:message1, greet2:message2});
```

show.ejsで二種類の挨拶を表示する.
```
  <p>挨拶1：<%= greet1 %></p>
  <p>挨拶2：<%= greet2 %></p>
```


## 2.おみくじ
- 概要:大吉,中吉のいずれかを表示し,運勢を占う.
- 使用方法:サイトにアクセスすると自動で表示される
- ファイル:view/luck.ejs

#### プログラムの解説
変数numに1から6のうちランダムな整数の値を代入する.
```bash
const num = Math.floor( Math.random() * 6 + 1 );
```

numの値が1の場合は大吉,2の場合は中吉を引数luckに代入する.この時,numが3から6の場合にはこのプログラムはluck.ejsに何も返さない.numが3から6の場合の処理も追加したい場合は,このプログラムに続く形でelse ifを用いてnumの値に対するluckを作成すれば良い.
```bash
if( num==1 ) luck = '大吉';
else if( num==2 ) luck = '中吉';
```
ターミナル上にluckを表示する.
```
console.log( 'あなたの運勢は' + luck + 'です' );
```

luck.ejsにnum,luckを返す.
```
res.render( 'luck', {number:num, luck:luck} );
```

luck.ejsでサイト上に運勢を表示する.
```
<p>あなたの今日の運勢は<%= luck %>です．</p>
```

### 3.ジャンケン
- 概要:利用者とコンピュータのジャンケン対戦を実施できる.
- 使用方法:サイトにアクセスし,入力欄にグー,チョキ,パーのいずれかを入力するとコンピュータとの勝敗の判定が出来る.
- 結果ページ:view/janken.ejs
- HTMLフォーム:public/janken.html

#### プログラムの解説
使用する引数hand,win,totalを定義する.handは利用者の出した手,winは利用者がコンピュータとの対戦で勝利した回数,totalは勝負を施行した回数である.
```
let hand = req.query.hand;
let win = Number( req.query.win );
let total = Number( req.query.total );
```

ターミナル上にhand,win,totalを表示する.
```
console.log( {hand, win, total});
```

変数numに1,2,3のいずれかの値を代入する.

```
const num = Math.floor( Math.random() * 3 + 1 );
```

コンピュータの手cpuを初期化したのち,numの値によりコンピュータの出す手を変化させる.
```
let cpu = '';
if( num==1 ) cpu = 'グー';
else if( num==2 ) cpu = 'チョキ';
else cpu = 'パー';
```

コンピュータと利用者のジャンケンの勝敗を決める.勝敗を決める引数をjudgementとする.利用者の勝ちであればjudgementを"勝ち"とし,勝利回数であるwinを+1する.あいこであればjudgementは”あいこ",負けであればjudgementは"負け"となる.

```
let judgement = '';
if(hand == cpu){
    judgement = 'あいこ';
}else if(
    (hand == 'グー' && cpu == 'チョキ') ||
    (hand == 'チョキ' && cpu == 'パー') ||
    (hand == 'パー' && cpu == 'グー')
){
   judgement = '勝ち';
  win += 1;
}else{
    judgement = '負け';
}
```
勝負を施行した回数であるtotalを+1する.
```
total += 1;
```

jenken.ejsに返すデータを引数displayにまとめる.

```
const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
}
```

jenken.ejsにdisplayを返す.
```
  res.render( 'janken', display );
```

janken.ejsで利用者の出した手,コンピュータの出した手,勝敗判定,勝負回数を表示し,再度ジャンケンをする場合は再度自分の出したい手を入力,送信する.

```
<body>
    <p>あなたの手は<%= your %>です．</p>
    <p>コンピュータは<%= cpu %>です．</p>
    <p>判定：<%= judgement %></p>
    <p>現在<%= total %>試合中<%= win %>勝しています．</p>
    <hr>
    <form action="/janken">
        <input type="text" name="hand" required>
        <label for="hand">次は何を出す？</label>
        <input type="hidden" name="win" value="<%= win %>">
        <input type="hidden" name="total" value="<%= total %>">
        <input type="submit" values="じゃんけん　ポン">
    </form>   
</body>
```

## プログラムのフローチャート

```mermaid
flowchart TD;
start["開始"];
end1["終了"]
if{ジャンケンの勝敗判定}
win["勝ち"]
loose["負け"]


start --> if
if -->|win| win
win --> end1
if -->|lose| loose
loose --> end1
```


### 4.ガチャ
- 概要:ランダムにアイテムを引くことができる.
- 使用方法:サイトにアクセスするとアイテムの抽選の結果が表示される.「ガチャを引きますか？」をクリックすると再度抽選を行うことができる.
- ファイル:view/gacha.ejs

#### プログラムの解説
引数topItemsに抽選したいアイテムが入っている.topItemsには以下の要素が含まれている.

- **`name`**: アイテムの名前
- **`rarity`**: アイテムのレア度
- **`probability`**: アイテムが当選する確率（%単位）

```
const topItems = [
  { name: "メンデルスゾーン", rarity: "レア", probability: 15 },
  { name: "龍の呼び声", rarity: "レア", probability: 15 },
  { name: "無双竜鬼ミツルギブースト", rarity: "レア", probability: 15 },
  { name: "龍秘陣 ジャックポット・エントリー", rarity: "ベリーレア", probability: 10 },
  { name: "永遠のリュウセイカイザー", rarity: "スーパーレア", probability: 6 },
  { name: "「修羅」の頂 VAN・ベートーヴェン", rarity: "スーパーレア", probability: 6 },
  { name: "ニコルボーラス", rarity: "スーパーレア", probability: 6 },
  { name: "偽りの王 ヴィルヘルム", rarity: "スーパーレア", probability: 6 },
  { name: "偽りの王 モーツァルト", rarity: "スーパーレア", probability: 6 },
  { name: "夢双龍覇 モルトDREAM", rarity: "スーパーレア", probability: 1 },
  { name: "暴龍事変 ガイグレン", rarity: "ビクトリーレア", probability: 3 },
  { name: "龍世界 ドラゴ大王", rarity: "ビクトリーレア", probability: 3 },
  { name: "超戦龍覇モルトNEXT", rarity: "ダブルビクトリーレア", probability: 3 },
  { name: "ボルシャック・ドギラゴン", rarity: "レジェンドレア", probability: 3 },
  { name: "禁断～封印されしX～", rarity: "禁断レジェンドレア", probability: 3 },
];
```
##### 抽選を行うtop関数の仕組み
抽選を行うtop関数は以下の処理を実行する.

1. **ランダムな数値を生成**  
- `Math.random()`を用いて0から99のランダムな整数を生成する.
- この数値を基準に、配列内のどのアイテムが当選するかを決定する.

```
function top() {
  const num = Math.floor(Math.random() * 100);
```

2. **確率を加算しながら比較**

配列topItemsを1つずつループし、各アイテムのprobabilityを累積する.ランダムな数値numが累積した確率以下になった時点で、該当のアイテムを当選とする.

```
let sumProbability = 0;

for (const item of topItems) {
    sumProbability += item.probability;
    if (num <= sumProbability) {
        return item;
    }
}
```

3. **当選アイテムの返却**

当選したアイテムをtop関数は返す.

```
results.push(top());
```

4. **当選したアイテムの表示**
gacha.ejsにて,当選したアイテムを表示する.その後続けて抽選を行いたい場合は,「ガチャを引きますか？」をクリックすると再度抽選が行われる.

```
<body>
    <p>あなたの引いたカードは <%= items[0].name %> です。</p>
    <p>レア度: <%= items[0].rarity %></p>
    <form action="/gacha">
        <button type="submit">ガチャを引きますか？</button>
</body>
```

#### プログラムのフローチャート
```mermaid
flowchart TD;
start["開始"];
access["利用者がアクセス"];
random["ランダムな数値を生成"];
select["確率に基づいてアイテムを選択"];
output["結果をgacha.ejsに渡して表示"];
finish["終了"];



start --> access;
access --> random;
random --> select;
select --> output;
output --> finish;
```

### 5.クイズ
- 概要:クイズ機能.日本の首都に関する二択問題を出題する.
- 使用方法:サイトにアクセスし,自分の正解だと思う方を選ぶ.
- ファイル:view/quiz

#### プログラム解説

1. **問題と選択肢の設定**

- 問題(`question`)と選択肢（`choise`）を定義する.
- 正解の答え（`correctAnswer`）も変数として保持する.

```
  const question = "日本の首都は?";
  const choise = ["東京","大阪"];
  const correctAnswer = "東京";
```

2. **利用者の回答を取得**
- 利用者の回答(`req.query.answer`)を取得する.

```
const userAnswer = req.query.answer;  
```

3. **回答の評価**
- 利用者の回答を評価し,結果を`result`に格納する.正解の場合は「正解!」,不正解の場合は「不正解!」を格納する.

```
let result = "";
if (userAnswer) {
    result = userAnswer === correctAnswer ? "正解！" : "不正解！";
  }
```

4. **結果の返却**
- quiz.ejsに問題文,選択肢,結果を返す.

```
  res.render("quiz", { question: question, choise: choise, result: result });
```

#### フローチャート
```mermaid
flowchart TD;
start["開始"];
access["利用者がサイトにアクセス"];
choise["利用者が2択のうちいずれかを選ぶ"];
end1["終了"]
if{問題の正誤判定}
correct["正解!"]
incorrect[不正解!]


start --> access
access --> choise
choise -->if
if --> correct
if --> incorrect
correct -->end1
incorrect-->end1


```
