'use strict';
var julianDay = require('./julianDay');
const JDN_of_20010101 = 2451911; // begin of XXI century: Jan 01, 2001

/**
 * @name week21c
 * @param {DateTime} gregorianDate on local time
 * @returns {?long} Week Number of gregorianDate
 *                  Jan 01, 2001, Monday - begin of week21c #1
 * @description week21c('2001-01-01') = 1
 */
function week21c( gregorianDate ) {

  const gDate = (typeof gregorianDate == 'object')
              ? gregorianDate 
              : new Date( gregorianDate );
  
  const diff = julianDay(gDate) - JDN_of_20010101;
  
  return (diff<0) 
         ? Math.floor((diff+1)/7)
         : Math.floor(diff/7)+1;
}

module.exports = week21c;