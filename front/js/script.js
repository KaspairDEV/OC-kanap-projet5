fetch("http://localhost:3000/api/products")
  .then((res) => res.json())

  .then((articlesProduits) => {
    // On vérifie que ça fonctionne en le récupérant sous forme de tableau dans la console
    console.table(articlesProduits);
    // On appel la fonction
    lesKanaps(articlesProduits);
  })
  // catch err
  .catch((err) => {
    document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
    console.log("erreur 404, sur ressource api:" + err);
  });

// fonction d'affichage des produits de l'api sur la page index

function lesKanaps(index) {
  // boucle pour chaque 'article' dans index
  for (let article of index) {
    // création des éléments html pour chaque article de l'api avec un lien vers la page produit qui contient un article qui contient img et h3 et p
    let a = document.createElement("a");
    a.href = `./product.html?_id=${article._id}`;
    let articleElt = document.createElement("article");
    let img = document.createElement("img");
    img.src = article.imageUrl;
    img.alt = article.altTxt;
    let h3 = document.createElement("h3");
    h3.classList.add("productName");
    h3.textContent = article.name;
    let p = document.createElement("p");
    p.classList.add("productDescription");
    p.textContent = article.description;
    // on ajoute les éléments dans l'ordre dans le DOM
    document.querySelector("#items").appendChild(a);
    a.appendChild(articleElt);
    articleElt.appendChild(img);
    articleElt.appendChild(h3);
    articleElt.appendChild(p);
  }
}
// --------- ancienne version de la fonction d'affichage des produits de l'api sur la page index ------------

/* zoneArticle.innerHTML += `<a href="./product.html?_id=${article._id}">
    <article>
      <img src="${article.imageUrl}" alt="${article.altTxt}">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">${article.description}</p>
    </article>
  </a>`; */
