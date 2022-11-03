// pour différancier la page confirmation et panier (Meme que sur cart.js)
const page = document.location.href;

// fonction affichage autoinvoquée du numéro de commande et vide du storage lorsque l'on est sur la page confirmation

(function Commande() {
  if (page.match("confirmation")) {
    sessionStorage.clear();
    localStorage.clear();
    // valeur du numero de commande
    let numCom = new URLSearchParams(document.location.search).get("commande");
    // merci et mise en page
    document.querySelector(
      "#orderId"
    ).innerHTML = `<br>${numCom}<br>Merci pour votre achat`;
    console.log("valeur de l'orderId venant de l'url: " + numCom);
    //réinitialisation du numero de commande
    numCom = undefined;
  } else {
    console.log("sur page cart");
  }
})();
