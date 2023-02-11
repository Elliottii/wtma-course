/**
 * Module for Sodexo menu data parsing
 *
 * @author eelik
 * @module Sodexo
 */

import { doFetch, getWeekdayIndex } from './network';

const weeklyUrl = 'https://www.sodexo.fi/ruokalistat/output/weekly_json/';

/**
 * Gets daily menu from Sodexo API
 *
 * @param {string} lang - menu language 'fi'/'en'
 * @returns Menu array
 */
const getDailyMenu = async (restaurantId, lang) => {
  try {
    const weeklyMenu = await doFetch(weeklyUrl + restaurantId);
    const menu = weeklyMenu.mealdates[getWeekdayIndex()];
    const coursesEn = Object.values(menu.courses).map(
      (course) => course.title_en
    );
    const coursesFi = Object.values(menu.courses).map(
      (course) => course.title_fi
    );
    return lang === 'en' ? coursesEn : coursesFi;
  } catch (error) {
    throw new Error('getDailyMenu error: ' + error);
  }
};

const Sodexo = { getDailyMenu };

export default Sodexo;
