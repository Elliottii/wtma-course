import MenuFi from '../mock-data/fazerFi.json';
import MenuEn from '../mock-data/fazerEn.json';

const coursesFi = MenuFi.MenusForDays[0].SetMenus.map((menuItem) => {
  return menuItem.Components.join(', ');
});
const coursesEn = MenuEn.MenusForDays[0].SetMenus.map((menuItem) =>
  menuItem.Components.join(', ')
);

const Fazer = { coursesEn, coursesFi };
export default Fazer;
