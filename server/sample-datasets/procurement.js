/**
 * @name Procurement // Закупка
 * 
 * @property {Number} gid - Global id of product item
 * @property {String} name - Название продукта (InnerName)
 * @property {Number} gr - Группа, используется для сортировки: 10 .. 99
 * @property {Number} qpu - Quantity per Unit - Количество штук в коробке 
 * @property {String} from - тип канала поставки товара: [ BY | RU | EU ]
 * @property {Number} frAct - Остаток товара на фирме (Актуальный)
 * @property {Number} fqL - Частота продаж в день (Last - последняя неделя)
 *   
 * @property {Array} sp - Надо коробок на Short Period (12 торговых дней).
 * @property {Array} mp - Надо коробок на Middle Period (24 торговых дней).
 * @property {Array} lp - Надо коробок на Short Period (36 торговых дней).
 * @property {Array} xlp - Надо коробок на Short Period (96 торговых дней).
 * 
 *            Array - [ Units(freqLast), Units(freqAvg), Units(freqMax)]
 *  Сколько надо коробок на каждый период по различной частоте продаж
 *  последней, средней за 6 недель, максимальной за 6 недель
 */


module.exports = [
  {
    gid: 2019051901,
    name: "Чай-Кофе #1",
    gr: 40,
    qpu: 11,
    from: "BY",
    frAct: 4,
    fqL: 20.33,
    sp : [ 1, 2, 3 ],
    mp : [ 2, 4, 6 ],
    lp : [ 3, 6, 9 ],
    xlp: [ 8,16,24 ],
  },
  {
    gid : 2019051902,
    name : "Чай-Кофе #2",
    gr : 30,
    qpu : 12,
    from : "BY,RU",
    frAct : 14,
    fqL : 12.5,
    sp : [ 1, 1, 2 ],
    mp : [ 2, 2, 4 ],
    lp : [ 3, 4, 8 ],
    xlp: [ 8,10,16 ],
  },
  {
    gid : 2019051903,
    name : "Чай-Кофе #3",
    gr : 20,
    qpu : 13,
    from : "EU,RU",
    frAct : 23,
    fqL : 28.96,
    sp : [ 1, 1, 4 ],
    mp : [ 2, 2, 4 ],
    lp : [ 3, 4, 6 ],
    xlp: [10,11,22 ],
  },
  {
    gid : 2019051904,
    name : "Чай-Кофе #4",
    gr : 10,
    qpu : 14,
    from : "BY,RU,EU",
    frAct : 33,
    fqL : 6.0,
    sp : [ 3, 2, 4 ],
    mp : [ 5, 4, 6 ],
    lp : [10,10,12 ],
    xlp: [40,40,48 ],
  },{
    "gid": "2012030106",
    "name": "JAF.лЗел АссортФрукт 100г",
    "gr": "10",
    "qpu": 20,
    "from": "RU,BY",
    "frAct": 0,
    "fqL": 0.1667,
    "sp": [ 1,1,1 ],
    "mp": [ 1,1,1 ],
    "lp": [ 1,1,1 ],
    "xlp": [ 1,1,1 ]
},{
    "gid": "2009083065",
    "name": "JAF.лЗел Ган Паудер 100г",
    "gr": "10",
    "qpu": 20,
    "from": "RU,BY",
    "frAct": 0,
    "fqL": 0,
    "sp": [ 0,1,0 ],
    "mp": [ 0,1,0 ],
    "lp": [ 0,1,0 ],
    "xlp": [ 0,1,0 ]
  },{
    "gid": "2009083070",
    "name": "JAF.лч Голд.Цейлон 100г",
    "gr": "10",
    "qpu": 20,
    "from": "RU,BY",
    "frAct": 0,
    "fqL": 0.1667,
    "sp": [ 1,1,1 ],
    "mp": [ 1,1,1 ],
    "lp": [ 1,1,1 ],
    "xlp": [ 1,1,1 ]
  },{
    "gid": "2012030108",
    "name": "JAF.лч Маджестик 100г",
    "gr": "10",
    "qpu": 20,
    "from": "RU,BY",
    "frAct": 0,
    "fqL": 0.1667,
    "sp": [ 1,1,1 ],
    "mp": [ 1,1,1 ],
    "lp": [ 1,1,1 ],
    "xlp": [ 1,1,1 ]
  },
];