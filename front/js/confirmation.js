// pour différancier la page confirmation et panier (Meme que sur cart.js)
const page = document.location.href;
if (page.match("cart")) {
  fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((objetProduits) => {
      console.log(objetProduits);
      affichagePanier(objetProduits);
    })
    .catch((err) => {
      document.querySelector("#cartAndFormContainer").innerHTML =
        "<h1>erreur 404</h1>";
      console.log("erreur 404, sur ressource api: " + err);
    });
} else {
  console.log("sur page confirmation");
}

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
