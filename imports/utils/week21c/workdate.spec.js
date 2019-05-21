
const work = require('./workdate');

const 
//  expect = require('chai').expect,
    should = require('chai').should()
//  , assert = require('assert')
;

const offsets = [
  -10,-9,-8,-7,-6,-5,-4,-3,-2,-1,
  0,1,2,3,4,5,6,7,8,9,10
];

describe("function work.date() testing ...", () => 
{
  it(`'' date: ${work.date()} week: ${work.week()}.`, () => {
    work.week().should.be.equal(work.week());
  });  

  offsets
  .forEach( elem => {
    it(` week: ${work.week(elem)} ${elem} date: ${work.date(elem)}.`, () => {
      work.week(elem).should.be.equal(work.week(elem));
    });  
  });
});

describe("function work.week() .today testing ...", () => 
{
  it(`'today' week: ${work.week()} date: ${work.today()}.`, () => {
    work.week().should.be.equal(work.week());
  });  
  it(`week+1: ${work.week(1)} week-1: ${work.week(-1)}.`, () => {
    work.week().should.be.equal(work.week());
  }); 
  it(`week+2: ${work.week(2)} week-2: ${work.week(-2)}.`, () => {
    work.week().should.be.equal(work.week());
  });
});

