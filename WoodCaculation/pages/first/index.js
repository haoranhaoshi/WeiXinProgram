//index.js
Page({
  data: {
    length: 0,
    diameter: 0,
    number: 0,
    unitPrice: 0,

    allNumber: 0,
    allVolume: 0,
    allPrice: 0,

    items: [],
    itemCount: 0,
  },
  lengthInput: function (e) {
    this.setData({ length: e.detail.value });
  },
  diameterInput: function (e) {
    this.setData({ diameter: e.detail.value });
  },
  numberInput: function (e) {
    this.setData({ number: e.detail.value });
  },
  unitPriceInput: function (e) {
    this.setData({ unitPrice: e.detail.value });
  },
  addItem: function (e) {
    var length = this.data.length;
    var diameter = this.data.diameter;
    var number = this.data.number;
    var unitPrice = this.data.unitPrice;

    var allNumber = this.data.allNumber;
    allNumber = parseInt(allNumber) + parseInt(number);

    var allVolume = this.data.allVolume;
    var oneVolume;
    if (diameter <= 14) {
      oneVolume = 0.7854 * length * Math.pow(parseInt(diameter) + parseFloat(parseFloat(0.45 * length) + parseFloat(0.2)), 2) / 10000;
    } else {
      oneVolume = 0.7854 * length * Math.pow((parseInt(diameter) + 0.5 * length + 0.005 * Math.pow(parseInt(length), 2) + 0.000125 * length * Math.pow(14 - parseInt(length), 2) * (10 - parseInt(length))), 2) / 10000;
    }
    if (diameter <= 7) {
      oneVolume = oneVolume.toFixed(4);
    } else {
      oneVolume = oneVolume.toFixed(3);
    }
    var itemVolume = oneVolume * number;
    allVolume = addNum(parseFloat(allVolume), parseFloat(itemVolume));

    var allPrice = this.data.allPrice;    
    var itemPrice = multiplyNum(itemVolume, unitPrice);
    allPrice = addNum(parseFloat(allPrice), parseFloat(itemPrice));

    this.setData({ allNumber: allNumber });
    this.setData({ allVolume: allVolume });
    this.setData({ allPrice: allPrice });

    var itemCount = this.data.itemCount;
    itemCount++;
    this.setData({ itemCount: itemCount });
        
    var items = this.data.items;
    console.log(itemCount + "-" + oneVolume + "-" + itemPrice);
    var item = { index: itemCount, length: length, diameter: diameter, number: number, unitPrice: unitPrice, itemVolume: itemVolume, itemPrice: itemPrice };
    items.splice(0, 0, item);
    this.setData({ items: items, itemCount: itemCount });
    //取代DOM操作
    // var query = wx.createSelectorQuery();
    // query.select('#add').boundingClientRect();
    // query.exec(function (res) {console.log(res[0].height)});
  },
})
var addNum = function (num1, num2) {
  var sq1, sq2, m;
  try {
    sq1 = num1.toString().split(".")[1].length;
  }
  catch (e) {
    sq1 = 0;
  }
  try {
    sq2 = num2.toString().split(".")[1].length;
  }
  catch (e) {
    sq2 = 0;
  }
  m = Math.pow(10, Math.max(sq1, sq2));
  return (num1 * m + num2 * m) / m;
}
var multiplyNum = function (num1, num2) {
  var sq1, sq2, m;
  try {
    sq1 = num1.toString().split(".")[1].length;
  }
  catch (e) {
    sq1 = 0;
  }
  try {
    sq2 = num2.toString().split(".")[1].length;
  }
  catch (e) {
    sq2 = 0;
  }
  m = Math.pow(10, Math.max(sq1, sq2));
  return (num1 * m * num2 * m) / m / m;
}