const coursesEn = [
  "Hamburger, cream sauce and poiled potates",
  "Goan style fish curry and whole grain rice",
  "Vegan Chili sin carne and whole grain rice",
  "Broccoli puree soup, side salad with two napas",
  "Lunch baguette with BBQ-turkey filling",
  "Cheese / Chicken / Vege / Halloum burger and french fries",
];
const coursesFi = [
  "Jauhelihapihvi, ruskeaa kermakastiketta ja keitettyä perunaa",
  "Goalaista kalacurrya ja täysjyväriisiä",
  "Vegaaninen Chili sin carne ja täysjyväriisi",
  "Parsakeittoa,lisäkesalaatti kahdella napaksella",
  "Lounaspatonki BBQ-kalkkuna täytteellä",
  "Juusto / Kana / Kasvis / Halloumi burgeri ja ranskalaiset",
];

let lang = "fi";
let activeMenu = coursesFi;
let order = "";

/**
 * Renders menu content to html page
 * @param {Array} menu - array of dishes
 */
const renderMenu = (menu) => {
  const menuBox = document.querySelector(".menu");
  menuBox.innerHTML = "";
  const menuList = document.createElement("ul");

  for (const dish of menu) {
    const li = document.createElement("li");
    li.textContent = dish;
    menuList.append(li);
  }
  menuBox.append(menuList);
};

renderMenu(activeMenu);

/**
 * Sort menu alphabetically
 * @param {Array} menu - Array of dishes
 * @param {string} order - "asc" or "desc"
 * @returns sorted menu array
 */
const sortMenu = (menu, order) => {
  if (order === "desc") {
    menu.reverse();
  } else {
    menu.sort();
  }
  return menu;
};

/**
 * Change UI language
 * @param {string} language
 */
const changeLanguage = (language) => {
  if (language === "fi") {
    activeMenu = coursesFi;
    document.querySelector("#title").innerHTML = "Ruokalista";
    document.querySelector("#sort").innerHTML = "Järjestä";
    document.querySelector("#fi-en").innerHTML = "Vaihda kieli";
    document.querySelector("#random").innerHTML = "Valitse satunnainen ateria";
  } else if (language === "en") {
    activeMenu = coursesEn;
    document.querySelector("#title").innerHTML = "Menu";
    document.querySelector("#sort").innerHTML = "Sort";
    document.querySelector("#fi-en").innerHTML = "Change language";
    document.querySelector("#random").innerHTML = "Pick random dish";
  }
  lang = language;
  renderMenu(activeMenu);
};

/**
 * Get a random item from an array of dishes
 * @param {Array} menu -Array of dishes
 * @returns random dish item
 */
const getRandomDish = (menu) => {
  const randomIndex = Math.floor(Math.random() * menu.length);
  return menu[randomIndex];
};

const sortButton = document.querySelector("#sort");
sortButton.addEventListener("click", () => {
  if (order === "asc") {
    order = "desc";
  } else {
    order = "asc";
  }
  renderMenu(sortMenu(activeMenu, order));
});

const changeLanguageButton = document.querySelector("#fi-en");
changeLanguageButton.addEventListener("click", () => {
  if (lang === "fi") {
    lang = "en";
  } else {
    lang = "fi";
  }
  changeLanguage(lang);
});

const randomDishButton = document.querySelector("#random");
randomDishButton.addEventListener("click", () => {
  document.querySelector("#random-dish").innerHTML = getRandomDish(activeMenu);
});
