/* eslint-disable no-undef */

const { julianDay } = require('../../utils');
const { datesAsString,
      datesAsDate } = require('./dataset-helper');

//const assert = require('assert');

describe("function julianDay() testing ...", 
() => {

  datesAsString()
  .forEach( elem => {
    it(`${elem[0]} is ${elem[2]} julian day.`, () => {
      expect(julianDay(elem[0])).toBe(elem[2]);
    });  
  });

  datesAsDate()
  .forEach( elem => {
    it(`${elem[0]} is ${elem[2]} julian day.`, () => {
      expect(julianDay(elem[0])).toBe(elem[2]);
    });  
  });

  let firstJDN = new Date(-4713,10,25);
  //console.log(firstJDN);
  //console.log(`julian day number is ${julianDay(firstJDN)}`);
  it('First Julian day (JDN=1) is Nov,23 -4713', () => {
    expect(julianDay(firstJDN)).toBe(1);
  });
  
});