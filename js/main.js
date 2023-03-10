var elBody = document.querySelector("body");
var elList = document.querySelector(".js-list");
var elForm = document.querySelector(".js-form");
var elInput = document.querySelector(".js-input");
var elSelect = document.querySelector(".js-select");
var elSortSelect = document.querySelector(".js-sort-select");
let elModeBtn = document.querySelector(".js-mode");
let elScrollBtn = document.querySelector(".js-scroll");

let theme = false;
let favoriteImgClick = false;

elModeBtn.addEventListener("click", () => {
  theme = !theme;

  let bg = theme ? "dark" : "light";
  localStorage.setItem("theme", bg);
  changeTheme();
});

changeTheme();

window.addEventListener("scroll", () => {
  if (window.scrollY >= 700) {
    elScrollBtn.classList.remove("d-none");
  } else {
    elScrollBtn.classList.add("d-none");
  }
});

function changeTheme() {
  if (localStorage.getItem("theme") === "dark") {
    document.querySelector("body").classList.add("dark");
    elModeBtn.children[0].src = "./images/mode-icon.png";
  } else {
    document.querySelector("body").classList.remove("dark");
    elModeBtn.children[0].src = "./images/mode-icon-dark.png";
  }
}

function createCardListItem(array, node) {
  elList.innerHTML = "";

  for (item of array) {
    var newItemLi = document.createElement("li");

    node.appendChild(newItemLi);
    newItemLi.setAttribute(
      "class",
      "col-12 col-md-4 col-lg-3 shadow p-3 rounded"
    );

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
        <li class="text-danger">${item.genres[0]}</li>
      </ul>
      <p class="text-primary">${item.overview
        .split(" ")
        .splice(0, 20)
        .join(" ")}...</p>`;
  }
}

function sortArray(arr, key, reverse) {
  return arr.sort((a, b) => {
    if (typeof a[key] === "number") {
      a = a[key];
      b = b[key];
      if (reverse) return b - a;
      return a - b;
    }
    if (typeof a[key] === "string") {
      a = a[key].toLowerCase().charCodeAt(0);
      b = b[key].toLowerCase().charCodeAt(0);
      if (reverse) return b - a;
      return a - b;
    }
  });
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

elSortSelect.addEventListener("change", (evt) => {
  evt.preventDefault();

  var elSortSelectVal = elSortSelect.value;

  if (elSortSelectVal !== "all") {
    if (elSortSelectVal === "a-z")
      createCardListItem(sortArray(films, "title"), elList);
    if (elSortSelectVal === "z-a")
      createCardListItem(sortArray(films, "title", true), elList);
    if (elSortSelectVal === "0-9")
      createCardListItem(sortArray(films, "id"), elList);
    if (elSortSelectVal === "9-0")
      createCardListItem(sortArray(films, "id", true), elList);
  }
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
