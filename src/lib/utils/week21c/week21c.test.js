/* eslint-disable no-undef */

var { week21c } = require('../../utils');
var { datesAsString,
      datesAsDate } = require('./dataset-helper');

//const assert = require('assert');

describe("function week21c() testing ...", () => {
  
  const dtNow = new Date();
  //let dtNow = Date.now();
  let strNow = dtNow.toString();

  test('week21c( Date ) should be return Number', () => {
    let value = week21c( dtNow );
    expect( typeof(value) ).toBe( 'number' );
  });

  test('week21c( String )should be return Number', () => {
    let value = week21c(strNow);
    expect( typeof(value) ).toBe( 'number' );
  });

  
  datesAsString()
  .forEach( elem => {
    test(`${elem[0]} is ${elem[1]} week.`, () => {
      expect( week21c( elem[0] )).toBe( elem[1] );
    });  
  });

  datesAsDate()
  .forEach( elem => {
    test(`${elem[0]} is ${elem[1]} week.`, () => {
      expect( week21c( elem[0] )).toBe( elem[1] );
    });  
  });

  //console.log(new Date(-4713,10,23));
  //it('First Julian day (JDN=1) Nov,23 -4713 is week -350271', () => {
  //  week21c(new Date(-4713,10,23)).should.be.equal(-350271);
  //});

  test('42 equal 42', () => {
    expect("42").toBe("42");
  });

  test('2 equal 2', () => {
    expect("2").toBe("2");
  });
});
