var elBody = document.querySelector("body");
var elList = document.querySelector(".js-list");
var elForm = document.querySelector(".js-form");
var elInput = document.querySelector(".js-input");
var elSelect = document.querySelector(".js-select");

function createCardListItem(array, node) {
  elList.innerHTML = "";

  for (item of array) {
    var newItemLi = document.createElement("li");

    node.appendChild(newItemLi);

    newItemLi.classList.add("col-12");
    newItemLi.classList.add("col-md-6");
    newItemLi.classList.add("col-lg-3");
    newItemLi.classList.add("rounded");
    newItemLi.classList.add("shadow");
    newItemLi.classList.add("p-3");

    newItemLi.innerHTML = `<div class="d-flex justify-content-between">
    <h2 class="h3 text-center" style="color: #${Math.floor(
      Math.random() * 1000
    )}">${item.title}</h2>
      <img
        class="img-fluid offset-1"
        width="60"
        height="60"
        src="${item.poster}"
        alt="${item.title} film image"
      />
      </div>
      <ul class="mb-3">
        <li>${item.genres[0]}</li>
      </ul>
      <p>${item.overview.split(" ").splice(0, 20).join(" ")}</p>`;
  }
}

createCardListItem(films, elList);

var sortfilms = [];
var filmsGenres = [];

films.forEach((film) => {
  film.genres.forEach((genre) => {
    filmsGenres.push(genre);
  });
});

var sortfilmsGenres = new Set(filmsGenres);

sortfilmsGenres.forEach((el) => {
  elOption = document.createElement("option");
  elSelect.appendChild(elOption);

  elOption.setAttribute("value", el);
  elOption.textContent = el;
});

elSelect.addEventListener("change", (evt) => {
  evt.preventDefault();

  sortfilms = [];

  films.forEach((film) => {
    film.genres.forEach((genre) => {
      if (elSelect.value == "All") {
        sortfilms = films;
      }
      if (elSelect.value == genre) sortfilms.push(film);
    });
  });

  createCardListItem(sortfilms, elList);
});

let searchfilms = [];

elForm.addEventListener("input", (evt) => {
  evt.preventDefault();
  let elInputVal = elInput.value;

  if (+elInputVal > films.length) {
    return (elList.innerHTML =
      '<li><h1 class="h1 text-center text-danger">NOT FOUND!</h1></li>');
  }

  films.forEach((film) => {
    if (typeof +elInputVal === "number") {
      if (film.id.includes(elInputVal)) searchfilms.push(film);
    }

    if (typeof elInputVal === "string") {
      if (
        film.title.toLowerCase().includes(elInputVal.toLowerCase()) ||
        film.title.toUpperCase().includes(elInputVal.toUpperCase())
      )
        searchfilms.push(film);
    }
  });

  createCardListItem(searchfilms, elList);
  searchfilms = [];
});
