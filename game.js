// game.js — メインゲームロジック（Risu Vocabulary Quest）

let currentIndex = 0;
let hearts = 10;
let tickets = 0;
let bonusHearts = 0;
let studiedCount = {}; // { en: 回数 }

const Game = {
  start(){
    currentIndex = 0;
    UI.updateHearts();
    UI.updateTickets();
    Game.nextQuestion();
  },

  nextQuestion(){
    if(currentIndex >= words.length){
      UI.showMessage("全問題クリア！おつかれ！");
      return;
    }
    const q = words[currentIndex];
    document.getElementById("question").innerText = `${q.jp}`;
    document.getElementById("answer").value = "";
  },

  submit(){
    const input = document.getElementById("answer").value.trim().toLowerCase();
    const q = words[currentIndex];

    if(input === q.en.toLowerCase()){
      Game.correct(q);
    } else {
      Game.incorrect(q);
    }
  },

  correct(q){
    UI.feedback("✔ 正解！", "correct");

    studiedCount[q.en] = (studiedCount[q.en] || 0) + 1;
    UI.updateStudiedList();

    // ★★★ XP 更新（絶対必要） ★★★
    UI.updateXP();

    bonusHearts++;
    if(bonusHearts >= 100){
      bonusHearts = 0;
      tickets++;
      UI.updateTickets();
      UI.showMessage("🎉 ボーナス100達成 → チケット獲得！");
    }

    currentIndex++;
    Game.nextQuestion();
    Account.saveData();

  },


incorrect(q){
    UI.feedback(`✘ 不正解… 正解: ${q.en}`, "wrong");

    if(!Items.preventDamage){
      hearts--;
    } else {
      Items.preventDamage = false;
      UI.showMessage("りすふん によりノーダメージ");
    }

    UI.updateHearts();

    // ★★★ HP が 0 → GAME OVER 処理 ★★★
    if(hearts <= 0){

      // ★ XP を 10 減らす
      let totalXP = 0;
      for(const key in studiedCount){
        totalXP += studiedCount[key];
      }

      // ここで全体XPを減らす
      let after = Math.max(0, totalXP - 10); // マイナスにはしない

      // studiedCount の再配分（簡易的に全部リセットして1単語に入れる）
      // → XP 全体値だけ保持
      let firstKey = Object.keys(studiedCount)[0];
      if(firstKey){
        studiedCount = {};
        studiedCount[firstKey] = after;
      }

      UI.updateXP();
      UI.updateStudiedList();

      // ★ HP 全回復（10 と仮定）
      hearts = 10;
      UI.updateHearts();

      UI.showScreen("mainMenu");
      UI.showMessage("💀 GAME OVER 💀\nXP -10 / HP 全回復");
      return;
    }

    currentIndex++;
    Game.nextQuestion();
    Account.saveData();

},
startWithIndex(){
    const n = parseInt(document.getElementById("startIndexInput").value);
    if(isNaN(n) || n < 1 || n > words.length){
      UI.showMessage("1〜" + words.length + " の間で入力してね");
      return;
    }

    currentIndex = n - 1; // 0始まりに補正
    UI.showScreen("quizScreen");
    UI.updateHearts();
    UI.updateTickets();
    UI.updateXP();
    Game.nextQuestion();
},



};
