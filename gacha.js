// gacha.js — ガチャシステム（初回限定100% SSR）

let firstGacha = true; // ★ 初回判定

const Gacha = {
  roll(){
    if(tickets <= 0){
      UI.showMessage("チケットが足りません");
      return;
    }

    tickets--;
    UI.updateTickets();

    let rarity;

    // ---------------------- 初回限定100% SSR ----------------------
    if(firstGacha){
      rarity = "SSR";
      firstGacha = false;
    } else {
      // 通常排出
      const r = Math.random() * 100;
      if(r < 1) rarity = "SSR";
      else if(r < 10) rarity = "SR";
      else if(r < 40) rarity = "R";
      else rarity = "N";
    }

    const result = Gacha.getItem(rarity);
    Gacha.showResult(result.rarity, result.item);

    // アイテム付与
    Items.add(result.item);
  },

  getItem(rarity){
    if(rarity === "SSR") return { rarity:"SSR", item:"りす漆" };
    if(rarity === "SR") return { rarity:"SR", item:"りす回転率" };
    if(rarity === "R")  return { rarity:"R",  item:"りすピラミッド" };
    return { rarity:"N", item:"りすふん" };
  },

  showResult(rarity, item){
    const box = document.getElementById("gachaResult");
    let cls = "n";
    if(rarity === "SSR") cls = "ssr";
    if(rarity === "SR")  cls = "sr";
    if(rarity === "R")   cls = "r";

    box.innerHTML = `<div class="${cls}">【${rarity}】${item} を獲得！</div>`;
  }
};