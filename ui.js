// ui.js — UI管理 + コメント機能

const UI = {
  showScreen(id){
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
  },

  feedback(msg, type){
    const box = document.getElementById("feedback");
    box.innerText = msg;
    box.style.color = type === 'correct' ? '#3fb950' : '#ff4d4d';
  },

  updateHearts(){
    document.getElementById("hearts").innerText = hearts;
  },

  updateTickets(){
    document.getElementById("tickets").innerText = tickets;
  },

  updateStudiedList(){
    const box = document.getElementById("studiedList");
    let html = "";
    for(const en in studiedCount){
      const count = studiedCount[en];
      html += `${en} : ${count}回<br>`;
    }
    box.innerHTML = html;
  },

  // ★★★ ここ！XP 表示を UI に正しく追加 ★★★
  updateXP(){
    let total = 0;
    for(const key in studiedCount){
      total += studiedCount[key];
    }
    document.getElementById("xp").innerText = total;
  },

  showMessage(msg){
    alert(msg);
  },

  // ---------------------- コメント機能 ----------------------

  addComment(){
    const text = document.getElementById("commentInput").value.trim();
    if(!text) return;

    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    comments.push(text);
    localStorage.setItem('comments', JSON.stringify(comments));

    document.getElementById("commentInput").value = "";
    UI.loadComments();
  },
  
  updateUserDisplay(){
  const box = document.getElementById("currentUser");
  if(Account.currentUser){
    box.innerText = "ログイン中: " + Account.currentUser;
  } else {
    box.innerText = "ログインしていません";
  }
},

  loadComments(){
    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    const list = document.getElementById("commentList");

    let html = "";
    comments.forEach(c => {
      html += `• ${c}<br>`;
    });

    list.innerHTML = html;
    
    
  },
  updateRank(){
  let total = 0;
  for(const key in studiedCount){
    total += studiedCount[key];
  }

  let rank = "F";
  if(total >= 800) rank = "S";
  else if(total >= 500) rank = "A";
  else if(total >= 300) rank = "B";
  else if(total >= 200) rank = "C";
  else if(total >= 100) rank = "D";
  else if(total >= 50)  rank = "E";

  document.getElementById("rank").innerText = rank;
}

};

// 起動時にコメント読み込み
document.addEvent

document.addEventListener("keydown", function(e){
  // Enterキーで送信
  if(e.key === "Enter"){
    // Quiz画面のときだけ発動
    const quizVisible = !document.getElementById("quizScreen").classList.contains("hidden");
    if(quizVisible){
      Game.submit();
    }
  }

  

});
