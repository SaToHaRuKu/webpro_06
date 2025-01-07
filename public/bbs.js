"use strict";

let number=0;
const bbs = document.querySelector('#bbs'); 


document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    if (!name || !message) {
        alert("名前とメッセージの両方を入力してください。");
        return; // 入力が空の場合、処理を中断
    }

    const params = {  // URL Encode
        method: "POST",
        body:  'name='+name+'&message='+message,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    console.log( params );
    const url = "/post";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#message').value = "";
    });
});



document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number;
        console.log( value );

        console.log( number );
        if( number != value ) {
            const params = {
                method: "POST",
                body: 'start='+number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";
            fetch( url, params )
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {
                number += response.messages.length;
                for( let mes of response.messages ) {
                    console.log( mes );  // 表示する投稿
                    let cover = document.createElement('div');
                    cover.className = 'cover';

                    let id_area = document.createElement('span');
                    id_area.className = 'id';
                    id_area.innerText = `ID: ${mes.id}`; 


                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;

                    

                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;

                    let like_area = document.createElement('span');
                    like_area.className = 'like-area';
                    like_area.innerText = `いいね: ${mes.likes || 0}`;  // いいねの数を表示
            
                    let like_button = document.createElement('button');
                    like_button.className = 'like-button';
                    like_button.setAttribute('data-id', mes.id);  // いいねボタンに投稿IDを設定
                    like_button.innerText = "いいね";
            
                    like_area.appendChild(like_button);  // いいねボタンを追加

                    cover.appendChild( id_area );
                    cover.appendChild( name_area );  
                    cover.appendChild( mes_area ); 
                    cover.appendChild(like_area);

                    bbs.appendChild( cover );
                }
            })
        }
    });
});


document.querySelector('#delete-button').addEventListener('click', () => {
    const deleteId = document.querySelector('#delete-id').value;
  
    if (!deleteId) {
      alert("削除したい項目のIDを入力してください");
      return; // 処理を中断
    }
    const params = {
      method: "POST",
      body: 'id=' + deleteId,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    const url = "/delete";
    fetch(url, params)
    .then((response) => {
      if (!response.ok) {
        return response.json().then(data => {
          alert(data.message); 
          throw new Error('Error');
        });
      }
      return response.json(); 
    })
    .then(data => {
      console.log(data.message); // サーバーのメッセージを確認
      alert(data.message); // 削除成功メッセージを表示
      document.querySelector("#delete-id").value = ""; // 入力フィールドをクリア
      location.reload(); // ページをリロードして削除を反映
    })
  });
  



document.querySelector('#edit-button').addEventListener('click', () => {
  const editId = document.querySelector('#edit-id').value; // 編集対象ID
  const editMessage = document.querySelector('#edit-message').value; // 新しいメッセージ

  if (!editId || !editMessage) {
    alert("IDとメッセージの両方を入力してください。");
    return; // 入力が空の場合、処理を中断
}

  const params = {
    method: "POST",
    body: `id=${editId}&message=${editMessage}`, // 新しいメッセージを含む
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  };
  const url = "/edit";

  fetch(url, params)
    .then((response) => {
      if (!response.ok) {
        throw new Error("編集に失敗しました");
      }
      return response.json();
    })
    .then((response) => {
      console.log(response.message); // 成功メッセージを確認
      alert(response.message); // 成功メッセージをアラートで表示
      document.querySelector('#edit-id').value = ""; // 入力フィールドをクリア
      document.querySelector('#edit-message').value = "";
      location.reload(); // ページをリロードして変更を反映
    })
});



document.querySelector('#bbs').addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('like-button')) {
      const postId = event.target.getAttribute('data-id');  // 投稿IDを取得
      
      const params = {
        method: "POST",
        body: 'id=' + postId,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };
  
      const url = "/like";  
      fetch(url, params)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error');
          }
          return response.json();
        })
        .then((data) => {
          alert(data.message);  // サーバーからのメッセージを表示
          location.reload();  // 画面をリロードして更新を反映
        })
    }
  });
  
