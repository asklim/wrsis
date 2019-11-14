/**
 * @name needUnitsForPeriod
 * @param {Object} item - из списка объектов api/sum/weeknatural
 * @param {Number} period - 12, 24, 36, 96 дней или другое.
 * Настраивается в /src/config/enumValues/procurementPeriods
 * @return {Array(3)} - [unitsForLast, unitsForAverage, unitsForMaximal]
 *  
 * Возвращает массив из трех значений: сколько нужно коробок на период period
 * по частоте продаж: последней, средней за 6 недель, максимальной за 6 недель
 * 
 * */
/*
Непредсказуемое решение: last = 1, а должно быть 0
period = 12
item = {
  gid : "2012030106",
  name : "Джаф.лЗ ФруктоАссорт 100г",
  gr : "10",
  qpu : 20,
  from : "RU,BY",
  frAct : 6,
  fqL : 0.5,
  fqA : 0.4166,
  fqM : 0.8333,
  valid : 24,
}
*/

module.exports.needUnitsForPeriod = (item, period) => {
  let 
    countLast, 
    countAvrg, 
    countMax
  ;
  const base = 10;
  //rounding to 1 digit after decimal period

  const {
    fqL: daySalesRateLast,
    fqA: daySalesRateAvrg,
    fqM: daySalesRateMax,
    qpu: quantityPerUnit,
    frAct: firmaRemainsActual, //remnants
  } = item;

  countLast = period*daySalesRateLast - firmaRemainsActual;
  let unitsLast = Math.round(base*(countLast))/base > 0 
    ? 1 + Math.trunc(countLast/quantityPerUnit) 
    : 0;

  countAvrg = period*daySalesRateAvrg - firmaRemainsActual;
  let unitsAvrg = Math.round(base*(countAvrg))/base > 0 
    ? 1 + Math.trunc(countAvrg/quantityPerUnit) 
    : 0;

  countMax = period*daySalesRateMax - firmaRemainsActual;
  let unitsMax = Math.round(base*(countMax))/base > 0 
    ? 1 + Math.trunc(countMax/quantityPerUnit) 
    : 0;  

/*
  if( process.env.NODE_ENV == 'test') 
  {
    console.log( '\n', 
      [ period, 
      daySalesRateLast, 
      daySalesRateAvrg,
      daySalesRateMax,
      firmaRemainsActual, ]
    );
    console.log( 'counts in function : ', [countLast, countAvrg, countMax ]);
    console.log( 'units in function : ', [ unitsLast, unitsAvrg, unitsMax ]);
  }
*/  
  return [ unitsLast, unitsAvrg, unitsMax ];
};
