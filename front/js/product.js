// Récupération de l'id du produit via l' URL
// params récupère l'url de la page   https://qastack.fr/programming/9870512/how-to-obtain-the-query-string-from-the-current-url-with-javascript
//
const params = new URLSearchParams(document.location.search); //console.log(document.location);  https://developer.mozilla.org/fr/docs/Web/API/Document/location
//  id va récupérer la valeur du paramètre _id
const id = params.get("_id");
console.log(id);
//
// Récupération du produit dont l'api est dans l'url

fetch("http://localhost:3000/api/products/" + id)
    .then((res) => res.json())
    .then((articleProduit) => {
        // execution de la fontion leProduit
        leProduit(articleProduit);
    })
    .catch((err) => {
        document.querySelector(".items").innerHTML = "<h1>erreur 404</h1>";
        console.log("erreur 404 sur ressource API : " + err);
    });
    
// Création d'objet articleClient
// déclaration objet articleClient prêt à être modifiée par les fonctions suivantes d'évènements
let articleClient = {};
// id du procuit
articleClient._id = id;
// fonction d'affichage du produit de l'api
function leProduit(produit) {
    // déclaration des variables pointage des éléments
    let imageAlt = document.querySelector("article div.item__img");
    let titre = document.querySelector("#title");
    let prix = document.querySelector("#price");
    let description = document.querySelector("#description");
    let couleurOption = document.querySelector("#colors");
    // ajout des éléments de manière dynamique
    imageAlt.innerHTML = `<img src="${produit.imageUrl}" alt="${produit.altTxt}">`;
    titre.textContent = `${produit.name}`;
    prix.textContent = `${produit.price}`;
    description.textContent = `${produit.description}`;
    // boucle pour chercher les couleurs pour chaque produit en fonction de sa clef/valeur (la logique: tableau dans un tableau = boucle dans boucle)
    for (let couleur of produit.colors) {
        // ajout des balises d'option couleur avec leur valeur
        couleurOption.innerHTML += `<option value="${couleur}">${couleur}</option>`;
    }
    console.log("affichage effectué");
}

// -------------------------------------------- choix couleur dynamique

let choixCouleur = document.querySelector("#colors");
// on ecoute #colors
choixCouleur.addEventListener("input", (ec) => {
  let couleurProduit;
  couleurProduit = ec.target.value;
  articleClient.couleur = couleurProduit;
  document.querySelector("#addToCart").getElementsByClassName.color = "white";
  document.querySelector("#addToCart").textContent = "Ajouter au panier";
  console.log(couleurProduit);
});

// ------------------------------------------ choix quantité dynamique

// définition des variables
let choixQuantité = document.querySelector('input[id="quantity"]');
let quantitéProduit;
// On écoute ce qu'il se passe dans input[name="itemQuantity"]
choixQuantité.addEventListener("input", (eq) => {
  quantitéProduit = eq.target.value;
  articleClient.quantité = quantitéProduit;
  document.querySelector("#addToCart").style.color = "white";
  document.querySelector("#addToCart").textContent = "Ajouter au panier";
  console.log(quantitéProduit);
});

// -------------------------------------------- condition d'ajout au panier
// conditions de validation du clic via le bouton ajouter au panier

let choixProduit = document.querySelector("#addToCart");
choixProduit.addEventListener("click", () => {
  if (
    articleClient.quantité < 1 ||
    articleClient.quantité > 100 ||
    articleClient.quantité === undefined ||
    articleClient.couleur === "" ||
    articleClient.couleur === undefined
  ) {
    alert(
      "Veuillez renseigner une couleur, et/ou une quantité valide ( entre 1 et 100 )"
    );
  } else {
    Panier();
    console.log("clic effectué");
    document.querySelector("#addToCart").style.color = "rgb(0, 205, 0)";
    document.querySelector("#addToCart").textContent = "Produit Ajouté !";
  }
});

// Déclaration de tableaux utiles

// déclaration tableau qui sera le 1er, unique et destiné à initialiser le panier
let choixProduitClient = [];
// déclaration tableau qui sera ce qu'on récupère du local storage appelé panierStocké et qu'on convertira en JSon (importance dans Panier())
let produitsEnregistrés = [];
// déclaration tableau qui sera un choix d'article/couleur non effectué donc non présent dans le panierStocké
let produitsTemporaires = [];
// déclaration tableau qui sera la concaténation des produitsEnregistrés et de produitsTemporaires
let produitsAPousser = [];

// fonction ajoutPremierProduit qui ajoute l'article choisi dans le tableau vierge
function ajoutPremierProduit() {
  console.log(produitsEnregistrés);
  if (produitsEnregistrés === null) {
    choixProduitClient.push(articleClient);
    console.log(articleClient);
    return (localStorage.panierStocké = JSON.stringify(choixProduitClient));
  }
}

// fonction ajoutAutreProduit qui ajoute l'article dans le tableau non vierge et fait un tri
// ----------------------------------------------------------------                                tri 
function ajoutAutreProduit() {
  // vide/initialise produitsAPousser pour recevoir les nouvelles données
  produitsAPousser = [];
  // pousse le produit choisit dans produitsTemporaires
  produitsTemporaires.push(articleClient);
  // combine produitsTemporaires et/dans produitsEnregistrés, ça s'appele produitsAPousser
  produitsAPousser = [...produitsEnregistrés, ...produitsTemporaires];
  //fonction pour trier et classer les id puis les couleurs https://www.azur-web.com/astuces/javascript-trier-tableau-objet
  produitsAPousser.sort(function triage(a, b) {
    if (a._id < b._id) return -1;
    if (a._id > b._id) return 1;
    if ((a._id = b._id)) {
      if (a.couleur < b.couleur) return -1;
      if (a.couleur > b.couleur) return 1;
    }
    return 0;
  });
  // vide/initialise produitsTemporaires maintenant qu'il a été utilisé
  produitsTemporaires = [];
  // dernière commande, envoit produitsAPousser dans le local storage sous le nom de panierStocké de manière JSON stringifié
  return (localStorage.panierStocké = JSON.stringify(produitsAPousser));
}
// fonction Panier qui ajuste la quantité si le produit est déja dans le tableau, sinon le rajoute si tableau il y a, ou créait le tableau avec un premier article choisi
function Panier() {
  // variable qui sera ce qu'on récupère du local storage appelé panierStocké et qu'on a convertit en JSon
  produitsEnregistrés = JSON.parse(localStorage.getItem("panierStocké"));
  if (produitsEnregistrés) {
    for (let choix of produitsEnregistrés) {
      if (choix._id === id && choix.couleur === articleClient.couleur) {
        //information client
        alert(
          "RAPPEL: Vous aviez déja choisit cet article, nous ajoutons la nouvelle quantité."
        );
        // on modifie la quantité d'un produit existant dans le panier du localstorage
        let additionQuantité =
          parseInt(choix.quantité) + parseInt(quantitéProduit);
        // on convertit en JSON le résultat précédent dans la zone voulue
        choix.quantité = JSON.stringify(additionQuantité);
        // dernière commande, on renvoit un nouveau panierStocké dans le localStorage
        return (localStorage.panierStocké =
          JSON.stringify(produitsEnregistrés));
      }
    }
    // appel fonction ajoutAutreProduit si la boucle au dessus ne retourne rien donc n'a pas d'égalité
    return ajoutAutreProduit();
  }
  // appel fonction ajoutPremierProduit si produitsEnregistrés n'existe pas
  return ajoutPremierProduit();
}
