'use strict';
/**
 * @name julianDay
 * @param {Date} gregorianDate Gregorian date at local timezone
 * @returns {?long} Number of Julian Day
 * @description Valid from November, 23 -4713 year A.D.(A.C., B.C.)
 */
function julianDay( gregorianDate ) {

  const gDate = (typeof gregorianDate == 'object')
              ? gregorianDate : new Date( gregorianDate );
  
  const year = gDate.getFullYear(); // return positiv & negative   
  const month = gDate.getMonth() + 1; //getMonth return 0 .. 11
  const day = gDate.getDate; // getDate return 1 .. 31

  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12*a - 3;

  return day + Math.floor((153*m + 2) / 5) +
         365*y - 32045 - Math.floor(y/100) +
         Math.floor(y/4) + Math.floor(y/400);
}

module.exports = julianDay;
