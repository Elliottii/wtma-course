import Sodexo from './modules/SodexoData';
import Fazer from './modules/FazerData';
import pwaApplyServiceWorkers from './modules/pwaModule';
// Global variables
let lang = 'fi';
let menuContainers = [];
let activeMenus = [];

/**
 * Renders menu content to html page
 * @param {Array} menu - array of dishes
 */
const renderMenu = (menu, targetElem) => {
  const menuContainer = targetElem;
  menuContainer.innerHTML = '';
  const list = document.createElement('ul');
  for (const dish of menu) {
    const li = document.createElement('li');
    li.textContent = dish;
    list.append(li);
  }
  menuContainer.append(list);

  /**
   * Buttons & event handlers
   */
  const sortButton = document.querySelector('#sort');
  sortButton.addEventListener('click', () => {
    renderMenu(sortMenu(menu), targetElem);
  });
};

/**
 * Sorts menu alphapetically
 * @param {Array} menu - Array of dishes
 * @param {string} order - 'asc' or 'desc'
 * @returns sorted menu array
 */
// TODO: fix for multiple menus
const sortMenu = (menu, order = 'asc') => {
  // create a copy of the menu for sorting
  // don't change the original arrays's order
  menu = [...menu];
  menu.sort();
  if (order === 'desc') {
    menu.reverse();
  }
  return menu;
};

/**
 * Change UI language
 * @param {string} language
 */
const changeLanguage = (language) => {
  if (language === 'fi') {
    activeMenus[0] = Sodexo.coursesFi;
    activeMenus[1] = Fazer.coursesFi;
  } else if (language === 'en') {
    activeMenus[0] = Sodexo.coursesEn;
    activeMenus[1] = Fazer.coursesEn;
  }
  lang = language;
  renderAll();
};

/**
 * Get a random dish fron an array
 * @param {Array} menu - Array of dishes
 * @returns random dish item
 */
const getRandomDish = (menu) => {
  const randomIndex = Math.floor(Math.random() * menu.length);
  return menu[randomIndex];
};

const langButton = document.querySelector('#fi-en');
langButton.addEventListener('click', () => {
  if (lang === 'fi') {
    changeLanguage('en');
  } else {
    changeLanguage('fi');
  }
});
const randButton = document.querySelector('#random');
randButton.addEventListener('click', () => {
  alert(getRandomDish(activeMenus[0]));
});

const renderAll = () => {
  for (const [index, menu] of activeMenus.entries()) {
    renderMenu(menu, menuContainers[index]);
  }
};

/**
 * App initalization
 */
const init = () => {
  activeMenus = [Sodexo.coursesFi, Fazer.coursesFi];
  menuContainers = document.querySelectorAll('.restaurant');
  renderAll();
};

init();

pwaApplyServiceWorkers.serviceWorkers();
