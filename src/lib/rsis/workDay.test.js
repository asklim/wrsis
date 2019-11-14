/* eslint-disable no-undef */

const { workDay } = require('.');
/*
const 
//  expect = require('chai').expect,
    should = require('chai').should()
//  , assert = require('assert')
;
*/
const offsets = [
  -10,
  -9,
  -8,
  -7,
  -6,
  -5,
  -4,
  -3,
  -2,
  -1,
  0, '2019-12-27', 991,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10
];

describe("function work.date() testing ...", () => 
{
  test(`'' date: ${workDay.date()} week: ${workDay.week()}.`, 
  () => {
    expect( workDay.week() ).toBe( workDay.week() );
  });  

  offsets
  .forEach( elem => {
    test(` week: ${workDay.week(elem)} ${elem} date: ${workDay.date(elem)}.`, 
    () => {
      expect( workDay.week(elem) ).toBe( workDay.week(elem) );
    });  
  });
});

describe("function work.week() .today testing ...", () => 
{
  test(`'today' week: ${workDay.week()} date: ${workDay.today()}.`, 
  () => {
    expect( workDay.week() ).toBe( workDay.week() );
  });  
  test(`week+1: ${workDay.week(1)} week-1: ${workDay.week(-1)}.`, 
  () => {
    expect( workDay.week() ).toBe( workDay.week() );
  }); 
  test(`week+2: ${workDay.week(2)} week-2: ${workDay.week(-2)}.`, 
  () => {
    expect( workDay.week() ).toBe( workDay.week() );
  });
});

