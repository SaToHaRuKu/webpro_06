"use strict";
const express = require("express");
const app = express();

let bbs = [];  // 本来はDBMSを使用するが，今回はこの変数にデータを蓄える

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// これより下はBBS関係
app.post("/check", (req, res) => {
  // 本来はここでDBMSに問い合わせる
  res.json( {number: bbs.length });
});

app.post("/read", (req, res) => {
  // 本来はここでDBMSに問い合わせる
  const start = Number( req.body.start );
  console.log( "read -> " + start );
  if( start==0 ) res.json( {messages: bbs });
  else res.json( {messages: bbs.slice( start )});
});

app.post("/post", (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  const id = bbs.length +1;
  console.log( [id,name, message] );
  // 本来はここでDBMSに保存する
  bbs.push( { id:id, name: name, message: message } );
  res.json( {number: id,name: name ,message:message} );
});


app.post("/delete", (req, res) => {
  const id = Number(req.body.id); // req.body.id を数値に変換
  console.log('削除するID:', id);

  // 削除前の件数を取得
  const originalLength = bbs.length;

  // id が一致するメッセージを削除
  bbs = bbs.filter(post => post.id !== id);

  // 削除後の件数を取得
  const newLength = bbs.length;

  // 削除の成否を判定
  if (originalLength === newLength) {
    // IDが見つからなかった場合
    return res.status(404).json({ message: "指定されたIDは存在しません。" });
  }

  // 削除成功時
  res.json({ message: "削除成功" });
});




app.post("/edit",(req,res)=>{
  const id = Number(req.body.id); 
  const newMessage = req.body.message;
  for(let i=0; i<bbs.length; i++){
    if(bbs[i].id === id){
      bbs[i].message = newMessage;
    }
  }
    console.log("編集成功", { id, newMessage });
    res.json({ message: "編集成功" });
  
});


app.post("/like", (req, res) => {
  const id = Number(req.body.id);  // 投稿IDを取得
  const post = bbs.find((message) => message.id === id);  // 投稿を検索
  
  if (!post) {
    // 投稿が見つからなかった場合
    return res.status(404).json({ message: "存在しないIDです" });
  }

  // likesがない場合は初期化
  if (post.likes === undefined) {
    post.likes = 0;  // 初期化
  }

  post.likes += 1;  // いいねを増やす

  // いいね数とIDをコンソールに出力
  console.log(`いいねが増えました: ID = ${post.id}, いいね数 = ${post.likes}`);

  // id と likes を含むレスポンスを返す
  res.json({ message: "いいねが増えました", id: post.id, likes: post.likes });
});







app.listen(8080, () => console.log("Example app listening on port 8080!"));
