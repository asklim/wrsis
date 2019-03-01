'use strict';
var util = require('../../../imports/utils');
var { datesAsString,
      datesAsDate } = require('./dataset-helper');
var expect = require('chai').expect
  , should = require('chai').should();

const assert = require('assert');

describe("function julianDay() testing ...", 
() => {

  datesAsString()
  .forEach( elem => {
    it(`${elem[0]} is ${elem[2]} julian day.`, () => {
      util.julianDay(elem[0]).should.be.equal(elem[2]);
    });  
  });

  datesAsDate()
  .forEach( elem => {
    it(`${elem[0]} is ${elem[2]} julian day.`, () => {
      util.julianDay(elem[0]).should.be.equal(elem[2]);
    });  
  });

  let firstJDN = new Date(-4713,10,25);
  //console.log(firstJDN);
  //console.log(`julian day number is ${julianDay(firstJDN)}`);
  it('First Julian day (JDN=1) is Nov,23 -4713', () => {
    util.julianDay(firstJDN).should.be.equal(1);
  });
  
});