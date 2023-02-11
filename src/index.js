/**
 * Main JS file
 *
 * @author: eelik
 */
import Sodexo from './modules/SodexoData';
import Fazer from './modules/FazerData';
import pwaApplyServiceWorkers from './modules/pwaModule';

// Global variables
let lang = 'fi';
const restaurants = [
  { name: 'Myrtsi', id: 152, type: 'sodexo' },
  { name: 'Karaportti', id: 3208, type: 'fazer' },
  { name: 'Myllypuro', id: 158, type: 'sodexo' },
];

/**
 * Renders menu content to html page
 * @param {Array} menu - array of dishes
 * @param {Object} targetElem - target DOM element
 */
const renderMenu = (menu, title, targetElem) => {
  const menuContainer = document.createElement('div');
  menuContainer.classList = 'restaurant';
  targetElem.append(menuContainer);
  const h3 = document.createElement('h3');
  h3.textContent = title;
  menuContainer.append(h3);
  const list = document.createElement('ul');
  for (const dish of menu) {
    const li = document.createElement('li');
    li.textContent = dish;
    list.append(li);
  }
  menuContainer.append(list);
};

/**
 * Iterates through restaurants array and render data to page
 */
const renderAllMenus = async () => {
  const menuWrapper = document.querySelector('.restaurant-container');
  menuWrapper.innerHTML = '';
  for (const restaurant of restaurants) {
    let menu;
    if (restaurant.type === 'sodexo') {
      menu = await Sodexo.getDailyMenu(restaurant.id, lang);
    } else if (restaurant.type === 'fazer') {
      menu = await Fazer.getDailyMenu(restaurant.id, lang);
    }
    renderMenu(menu, restaurant.name, menuWrapper);
  }
};

/**
 * Change UI language
 * @param {string} language
 */
const changeLanguage = async (language) => {
  lang = language;
  renderAllMenus();
};

/**
 * Buttons & event handlers
 */
const langButton = document.querySelector('#fi-en');
langButton.addEventListener('click', () => {
  if (lang === 'fi') {
    changeLanguage('en');
  } else {
    changeLanguage('fi');
  }
});

/**
 * App initalization
 */
const init = async () => {
  renderAllMenus();
};
init();

pwaApplyServiceWorkers.serviceWorkers();
