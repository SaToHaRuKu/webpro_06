const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';

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
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

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

function top() {
  const num = Math.random() * 100;
  let sumProbability = 0;

  for (const item of topItems) {
    sumProbability += item.probability;
    if (num < sumProbability) {
      return item;
    }
  }
}

app.get("/select", (req, res) => {
  res.render("select");  
});

app.get("/gacha", (req, res) => {
  const type = req.query.type; 
  let items = [];

  if (type === "multi") {
    for (let i = 0; i < 10; i++) {
      items.push(top());
    }
  } else {
    items.push(top());
  }

  res.render("gacha", { items });
});


app.get("/quiz", (req, res) => {
  const questions = [
    {
      question: "日本の首都は?",
      choices: ["東京", "大阪", "名古屋", "福岡"],
      correctAnswer: "東京",
    },
    {
      question: "マラソン中に3番目の人を抜いたらあなたは何番になる？",
      choices: ["1番目", "2番目", "3番目", "4番目"],
      correctAnswer: "3番目",
    },
    {
      question: "信号が赤の灯火の点滅の場合車や路面電車はどうする？",
      choices: [ "停止位置で一時停止し、安全を確認したのち進行する", "歩行者に注意して徐行する", "他の交通に注意して進む"],
      correctAnswer: "停止位置で一時停止し、安全を確認したのち進行する",
    },
  ];

  const userAnswers = req.query.answers || []; 
  let results = null;

  if (userAnswers.length > 0) {
    results = questions.map((q, index) => {
      const userAnswer = userAnswers[index];
      return userAnswer === q.correctAnswer ? "正解！" : "不正解！";
    });
  }

  res.render("quiz", { questions, results });
});



app.listen(8080, () => console.log("Example app listening on port 8080!"));
