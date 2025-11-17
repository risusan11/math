// items.js — アイテム効果管理

const Items = {
  inventory: {
    "りすピラミッド": 0,
    "りす回転率": 0,
    "りす漆": 0,
    "りすふん": 0
  },

  preventDamage: false, // りすふん効果
  speedBoost: false,    // りす回転率
  expBoost: false,      // りすピラミッド

  use(item){
    if(!Items.inventory[item] || Items.inventory[item] <= 0){
      UI.showMessage("アイテムが足りません");
      return;
    }

    Items.inventory[item]--;
    UI.showMessage(item + " を使った！");

    // ---------------------- 効果発動 ----------------------
    if(item === "りすふん"){
      Items.preventDamage = true;
    }

    if(item === "りすピラミッド"){
      Items.expBoost = true;
      setTimeout(() => { Items.expBoost = false; }, 60000); // 1分効果
    }

    if(item === "りす回転率"){
      Items.speedBoost = true;
      setTimeout(() => { Items.speedBoost = false; }, 60000);
    }

    if(item === "りす漆"){
      document.body.style.background = "#000000";
      document.body.style.color = "#f5d56e";
    }

    UI.updateItems();
  },

  add(item){
    Items.inventory[item] = (Items.inventory[item] || 0) + 1;
    UI.updateItems();
  }
};