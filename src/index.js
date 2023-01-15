import JSONMenu from "./menu.json";

const menuCourses = Object.values(JSONMenu.courses);
let lang = "fi";
let activeMenu = [];
let order = "";

/**
 * Creates menu from JSON
 * @param {string} lang - Selected language
 * @returns
 */
const createMenu = (lang) => {
  activeMenu = [];
  for (const dish of menuCourses) {
    if (lang === "en") {
      activeMenu.push(dish.title_en);
    } else if (lang === "fi") {
      activeMenu.push(dish.title_fi);
    }
  }
  return activeMenu;
};

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

renderMenu(createMenu(lang));

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
    document.querySelector("#sort").innerHTML = "Järjestä";
    document.querySelector("#fi-en").innerHTML = "Vaihda kieli";
    document.querySelector("#random").innerHTML = "Valitse satunnainen ateria";
  } else if (language === "en") {
    document.querySelector("#sort").innerHTML = "Sort";
    document.querySelector("#fi-en").innerHTML = "Change language";
    document.querySelector("#random").innerHTML = "Pick random dish";
  }
  lang = language;
  renderMenu(createMenu(lang));
};

/**
 * Get a random item from an array of dishes
 * @param {Array} menu -Array of dishes
 * @returns random dish item
 */
const getRandomDish = (menu) => {
  const randomIndex = Math.floor(
    Math.random() * Object.keys(JSONMenu.courses).length
  );
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
