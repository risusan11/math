const Account = {
  currentUser: null,

  login(){
    const name = document.getElementById("userNameInput").value.trim();
    if(!name){
      UI.showMessage("ユーザー名を入力してね");
      return;
    }

    Account.currentUser = name;

    // データが無ければ作成
    if(!localStorage.getItem("user_" + name)){
      const data = {
        hearts: 10,
        tickets: 0,
        studiedCount: {},
      };
      localStorage.setItem("user_" + name, JSON.stringify(data));
    }

    UI.showMessage(name + " としてログインしたよ！");
    UI.updateUserDisplay();
    Account.loadData();
  },

  loadData(){
    const data = JSON.parse(localStorage.getItem("user_" + Account.currentUser));

    hearts = data.hearts || 10;
    tickets = data.tickets || 0;
    studiedCount = data.studiedCount || {};

    UI.updateHearts();
    UI.updateTickets();
    UI.updateStudiedList();
    UI.updateXP();
  },

  saveData(){
    if(!Account.currentUser) return;

    const data = {
      hearts,
      tickets,
      studiedCount
    };

    localStorage.setItem("user_" + Account.currentUser, JSON.stringify(data));
  },

  emailLogin(){
  const email = document.getElementById("emailInput").value.trim();
  const pass  = document.getElementById("passwordInput").value.trim();

  if(!email || !pass){
    UI.showMessage("メールアドレスとパスワードを入力してね");
    return;
  }

  // 保存データを探す
  const key = "user_" + email;

  if(!localStorage.getItem(key)){
    // アカウントが存在しない → 新規作成
    const hash = btoa(pass); // 簡易暗号化
    const data = {
      password: hash,
      hearts: 10,
      tickets: 0,
      studiedCount: {}
    };
    localStorage.setItem(key, JSON.stringify(data));

    UI.showMessage("新規アカウント作成！メールでログイン完了🔥");
  }

  // 既存アカウント → パスワード確認
  const user = JSON.parse(localStorage.getItem(key));

  if(user.password !== btoa(pass)){
    UI.showMessage("パスワードが違うよ");
    return;
  }

  // ログイン成功
  Account.currentUser = email;

  UI.updateUserDisplay();
  Account.loadData();
  UI.showMessage(email + " としてログインしたよ！");
},

togglePassword(){
  const input = document.getElementById("passwordInput");
  if(input.type === "password"){
    input.type = "text";   // パスワードを見えるように
  } else {
    input.type = "password"; // パスワードを非表示
  }
}


};
