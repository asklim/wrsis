/**
 * @name WeekSummaryNatural // итоги недели в натуральных величинах
 * 
 * @property {String} gid - Global id of product item
 * @property {String} name - Название продукта (InnerName)
 * @property {String} gr - Группа, используется для сортировки: 10 .. 99
 * @property {Number} qpu - Quantity per Unit - Количество штук в коробке 
 * @property {String} type - тип канала поставки товара: [ BY | RU | EU ]
 * @property {Number} frAct - Остаток товара на фирме (Актуальный)
 * @property {Number} fqL - Частота продаж в день (Last - последняя неделя)
 * @property {Number} fqA - Частота продаж в день (Average - среднее за 6 недель)  
 * @property {Number} fqM - Частота продаж в день (Maximal - максим за 6 недель)
 * @property {Number} valid - Срок годности в месяцах 
 */


module.exports = [
  {
    gid : "2019051901",
    name : "Чай-Кофе #1",
    gr : "40",
    qpu : 11,
    type : "BY",
    frAct : 4,
    fqL : 20.33,
    fqA : 21.33,
    fqM : 22.0,
    valid : 24,
  },
  {
    gid : "2019051902",
    name : "Чай-Кофе #2",
    gr : "30",
    qpu : 12,
    type : "BY,RU",
    frAct : 14,
    fqL : 12.5,
    fqA : 12.0,
    fqM : 12.9,
    valid : 24,
  },
  {
    gid : "2019051903",
    name : "Чай-Кофе #3",
    gr : "20",
    qpu : 13,
    type : "EU,RU",
    frAct : 23,
    fqL : 28.96,
    fqA : 26.33,
    fqM : 30.33,
    valid : 24,
  },
  {
    gid : "2019051904",
    name : "Чай-Кофе #4",
    gr : "10",
    qpu : 14,
    type : "BY,RU,EU",
    frAct : 33,
    fqL : 6.0,
    fqA : 7.33,
    fqM : 8.33,
    valid : 24,
  },
];