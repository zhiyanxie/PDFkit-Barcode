

var PDFDocument = require('pdfkit');
var utils = function (){
  var decidePattern, generateBarCode, pdfInit;
  pdfInit = function(signage, index_signage, type, doc) {
    var i, _i, _j, _k, _l;
    if (type === 'table') {
      if (index_signage === 0) {
        doc = new PDFDocument({
          layout: 'landscape'
        });
      } else {
        doc.addPage({
          layout: 'landscape'
        });
      }
      doc.moveTo(0, 0).lineTo(792, 0).stroke('black');
      doc.moveTo(0, 0).lineTo(0, 612).stroke('black');
      doc.moveTo(792, 612).lineTo(792, 0).stroke('black');
      doc.moveTo(792, 612).lineTo(0, 612).stroke('black');
      doc.moveDown(1.5);
      doc.fontSize(40).text(signage.title, 220).moveDown();
      doc.fontSize(25).text(signage.weight, 100);
      doc.fontSize(30).text(signage.promotion, 100);
      doc.fontSize(150).text(signage.price, 320);
      doc.fontSize(30).text('12/15/2015  xxxxx x');
      doc.moveDown(0.15);
      doc.fontSize(10).text(signage.barcodeText, 100);
    } else if (type === 'shelf') {
      if (index_signage % 12 === 0) {
        if (index_signage === 0) {
          doc = new PDFDocument({
            layout: 'landscape',
            margins: [0, 0, 0, 0]
          });
        } else {
          doc.addPage({
            layout: 'landscape',
            margins: [0, 0, 0, 0]
          });
        }
        for (i = _i = 0; _i <= 6; i = ++_i) {
          doc.moveTo(0, i * 90).lineTo(720, i * 90).stroke('black');
        }
        for (i = _j = 0; _j <= 2; i = ++_j) {
          doc.moveTo(360 * i, 0).lineTo(360 * i, 540).stroke('black');
        }
      }
      if (index_signage >= 12) {
        index_signage = index_signage % 12;
      }
      if (index_signage & 1) {
        doc.fontSize(10).text(signage.title, 120 + 360, 5 + 90 * ((index_signage - 1) / 2));
        doc.fontSize(10).text(signage.weight, 10 + 360, 20 + 90 * ((index_signage - 1) / 2));
        doc.fontSize(15).text(signage.promotion, 30 + 360, 35 + 90 * ((index_signage - 1) / 2));
        doc.fontSize(20).text(signage.price, 200 + 360, 40 + 90 * ((index_signage - 1) / 2));
        doc.fontSize(10).text('12/15/2015  xxxxx x', 200 + 360, 60 + 90 * ((index_signage - 1) / 2));
        doc.moveDown(0.1);
        doc.fontSize(7).text(signage.barcodeText, 25 + 360, 75 + 90 * ((index_signage - 1) / 2));
      } else {
        doc.fontSize(10).text(signage.title, 120, 5 + 90 * (index_signage / 2));
        doc.fontSize(10).text(signage.weight, 10, 20 + 90 * (index_signage / 2));
        doc.fontSize(15).text(signage.promotion, 30, 35 + 90 * (index_signage / 2));
        doc.fontSize(20).text(signage.price, 200, 40 + 90 * (index_signage / 2));
        doc.fontSize(10).text('12/15/2015  xxxxx x', 200, 60 + 90 * (index_signage / 2));
        doc.moveDown(0.1);
        doc.fontSize(7).text(signage.barcodeText, 25, 75 + 90 * (index_signage / 2));
      }
    } else {
      if (index_signage % 4 === 0) {
        if (index_signage === 0) {
          doc = new PDFDocument({
            layout: 'landscape',
            margins: [0, 0, 0, 0]
          });
        } else {
          doc.addPage({
            layout: 'landscape',
            margins: [0, 0, 0, 0]
          });
        }
        for (i = _k = 0; _k <= 2; i = ++_k) {
          doc.moveTo(0, i * 252).lineTo(720, i * 252).stroke('black');
        }
        for (i = _l = 0; _l <= 2; i = ++_l) {
          doc.moveTo(360 * i, 0).lineTo(360 * i, 252 * 2).stroke('black');
        }
      }
      if (index_signage >= 4) {
        index_signage = index_signage % 4;
      }
      if (index_signage & 1) {
        doc.fontSize(20).text(signage.title, 100 + 360, 15 + 252 * ((index_signage - 1) / 2));
        doc.fontSize(15).text(signage.weight, 15 + 360, 50 + 252 * ((index_signage - 1) / 2));
        doc.fontSize(20).text(signage.promotion, 30 + 360, 100 + 252 * ((index_signage - 1) / 2));
        doc.fontSize(30).text(signage.price, 200 + 360, 100 + 252 * ((index_signage - 1) / 2));
        doc.fontSize(10).text('12/15/2015  xxxxx x', 200 + 360, 180 + 252 * ((index_signage - 1) / 2));
        doc.moveDown(0.1);
        doc.fontSize(7).text(signage.barcodeText, 30 + 360, 180 + 252 * ((index_signage - 1) / 2));
      } else {
        console.log('feature even');
        doc.fontSize(20).text(signage.title, 100, 15 + 252 * (index_signage / 2));
        doc.fontSize(15).text(signage.weight, 15, 50 + 252 * (index_signage / 2));
        doc.fontSize(20).text(signage.promotion, 30, 100 + 252 * (index_signage / 2));
        doc.fontSize(30).text(signage.price, 200, 100 + 252 * (index_signage / 2));
        doc.fontSize(10).text('12/15/2015  xxxxx x', 200, 180 + 252 * (index_signage / 2));
        doc.moveDown(0.1);
        doc.fontSize(7).text(signage.barcodeText, 30, 180 + 252 * (index_signage / 2));
      }
    }
    return doc;
  };
  decidePattern = function(doc, number, flag, height, barcodeHeight, barcodeMargin) {
    var color1, color2;
    color1 = void 0;
    color2 = void 0;
    if (flag === 'left') {
      color1 = 'white';
      color2 = 'black';
    } else {
      color1 = 'black';
      color2 = 'white';
    }
    if (number === '0') {
      doc.rect(barcodeMargin, height, 3, barcodeHeight).fill(color1);
      barcodeMargin += 3;
      doc.rect(barcodeMargin, height, 2, barcodeHeight).fill(color2);
      barcodeMargin += 2;
      doc.rect(barcodeMargin, height, 1, barcodeHeight).fill(color1);
      barcodeMargin += 1;
      doc.rect(barcodeMargin, height, 1, barcodeHeight).fill(color2);
      barcodeMargin += 1;
    } else if (number === '1') {
      doc.rect(barcodeMargin, height, 2, barcodeHeight).fill(color1);
      barcodeMargin += 2;
      doc.rect(barcodeMargin, height, 2, barcodeHeight).fill(color2);
      barcodeMargin += 2;
      doc.rect(barcodeMargin, height, 2, barcodeHeight).fill(color1);
      barcodeMargin += 2;
      doc.rect(barcodeMargin, height, 1, barcodeHeight).fill(color2);
      barcodeMargin += 1;
    } else if (number === '2') {
      doc.rect(barcodeMargin, height, 2, barcodeHeight).fill(color1);
      barcodeMargin += 2;
      doc.rect(barcodeMargin, height, 1, barcodeHeight).fill(color2);
      barcodeMargin += 1;
      doc.rect(barcodeMargin, height, 2, barcodeHeight).fill(color1);
      barcodeMargin += 2;
      doc.rect(barcodeMargin, height, 2, barcodeHeight).fill(color2);
      barcodeMargin += 2;
    } else if (number === '3') {
      doc.rect(barcodeMargin, height, 1, barcodeHeight).fill(color1);
      barcodeMargin += 1;
      doc.rect(barcodeMargin, height, 4, barcodeHeight).fill(color2);
      barcodeMargin += 4;
      doc.rect(barcodeMargin, height, 1, barcodeHeight).fill(color1);
      barcodeMargin += 1;
      doc.rect(barcodeMargin, height, 1, barcodeHeight).fill(color2);
      barcodeMargin += 1;
    } else if (number === '4') {
      doc.rect(barcodeMargin, height, 1, barcodeHeight).fill(color1);
      barcodeMargin += 1;
      doc.rect(barcodeMargin, height, 1, barcodeHeight).fill(color2);
      barcodeMargin += 1;
      doc.rect(barcodeMargin, height, 3, barcodeHeight).fill(color1);
      barcodeMargin += 3;
      doc.rect(barcodeMargin, height, 2, barcodeHeight).fill(color2);
      barcodeMargin += 2;
    } else if (number === '5') {
      doc.rect(barcodeMargin, height, 1, barcodeHeight).fill(color1);
      barcodeMargin += 1;
      doc.rect(barcodeMargin, height, 2, barcodeHeight).fill(color2);
      barcodeMargin += 2;
      doc.rect(barcodeMargin, height, 3, barcodeHeight).fill(color1);
      barcodeMargin += 3;
      doc.rect(barcodeMargin, height, 1, barcodeHeight).fill(color2);
      barcodeMargin += 1;
    } else if (number === '6') {
      doc.rect(barcodeMargin, height, 1, barcodeHeight).fill(color1);
      barcodeMargin += 1;
      doc.rect(barcodeMargin, height, 1, barcodeHeight).fill(color2);
      barcodeMargin += 1;
      doc.rect(barcodeMargin, height, 1, barcodeHeight).fill(color1);
      barcodeMargin += 1;
      doc.rect(barcodeMargin, height, 4, barcodeHeight).fill(color2);
      barcodeMargin += 4;
    } else if (number === '7') {
      doc.rect(barcodeMargin, height, 1, barcodeHeight).fill(color1);
      barcodeMargin += 1;
      doc.rect(barcodeMargin, height, 3, barcodeHeight).fill(color2);
      barcodeMargin += 3;
      doc.rect(barcodeMargin, height, 1, barcodeHeight).fill(color1);
      barcodeMargin += 1;
      doc.rect(barcodeMargin, height, 2, barcodeHeight).fill(color2);
      barcodeMargin += 2;
    } else if (number === '8') {
      doc.rect(barcodeMargin, height, 1, barcodeHeight).fill(color1);
      barcodeMargin += 1;
      doc.rect(barcodeMargin, height, 2, barcodeHeight).fill(color2);
      barcodeMargin += 2;
      doc.rect(barcodeMargin, height, 1, barcodeHeight).fill(color1);
      barcodeMargin += 1;
      doc.rect(barcodeMargin, height, 3, barcodeHeight).fill(color2);
      barcodeMargin += 3;
    } else {
      doc.rect(barcodeMargin, height, 3, barcodeHeight).fill(color1);
      barcodeMargin += 3;
      doc.rect(barcodeMargin, height, 1, barcodeHeight).fill(color2);
      barcodeMargin += 1;
      doc.rect(barcodeMargin, height, 1, barcodeHeight).fill(color1);
      barcodeMargin += 1;
      doc.rect(barcodeMargin, height, 2, barcodeHeight).fill(color2);
      barcodeMargin += 2;
    }
    return barcodeMargin;
  };
  generateBarCode = function(doc, input, type, index) {
    var barcodeHeight, barcodeMargin, height, i, temp;
    i = void 0;
    i = 0;
    if (type === 'shelf') {
      if (index & 1) {
        height = 60 + 90 * ((index - 1) / 2);
        barcodeHeight = 10;
        barcodeMargin = 10 + 360;
      } else {
        height = 60 + +90 * (index / 2);
        barcodeHeight = 10;
        barcodeMargin = 10;
      }
    } else if (type === 'feature') {
      if (index & 1) {
        height = 160 + 252 * ((index - 1) / 2);
        barcodeHeight = 10;
        barcodeMargin = 10 + 360;
      } else {
        height = 160 + +252 * (index / 2);
        barcodeHeight = 10;
        barcodeMargin = 10;
      }
    } else {
      height = 400;
      barcodeHeight = 40;
      barcodeMargin = 80;
    }
    while (i < input.length + 1) {
      if (i === 0) {
        doc.rect(barcodeMargin, height, 5, barcodeHeight + 0.1 * barcodeHeight).fill('white');
        barcodeMargin += 5;
        doc.rect(barcodeMargin, height, 1, barcodeHeight + 0.1 * barcodeHeight).fill('black');
        barcodeMargin += 1;
        doc.rect(barcodeMargin, height, 1, barcodeHeight + 0.1 * barcodeHeight).fill('white');
        barcodeMargin += 1;
        doc.rect(barcodeMargin, height, 1, barcodeHeight + 0.1 * barcodeHeight).fill('black');
        barcodeMargin += 1;
      }
      if (i === 12) {
        doc.rect(barcodeMargin, height, 1, barcodeHeight + 0.1 * barcodeHeight).fill('black');
        barcodeMargin += 1;
        doc.rect(barcodeMargin, height, 1, barcodeHeight + 0.1 * barcodeHeight).fill('white');
        barcodeMargin += 1;
        doc.rect(barcodeMargin, height, 1, barcodeHeight + 0.1 * barcodeHeight).fill('black');
        barcodeMargin += 1;
        doc.rect(barcodeMargin, height, 5, barcodeHeight + 0.1 * barcodeHeight).fill('white');
        barcodeMargin += 5;
      }
      if (i === 6) {
        doc.rect(barcodeMargin, height, 1, barcodeHeight + 0.1 * barcodeHeight).fill('white');
        barcodeMargin += 1;
        doc.rect(barcodeMargin, height, 1, barcodeHeight + 0.1 * barcodeHeight).fill('black');
        barcodeMargin += 1;
        doc.rect(barcodeMargin, height, 1, barcodeHeight + 0.1 * barcodeHeight).fill('white');
        barcodeMargin += 1;
        doc.rect(barcodeMargin, height, 1, barcodeHeight + 0.1 * barcodeHeight).fill('black');
        barcodeMargin += 1;
        doc.rect(barcodeMargin, height, 1, barcodeHeight + 0.1 * barcodeHeight).fill('white');
        barcodeMargin += 1;
      }
      if (i < 6) {
        temp = decidePattern(doc, input[i], 'left', height, barcodeHeight, barcodeMargin);
        barcodeMargin += temp - barcodeMargin;
      }
      if (i > 5 && i < 12) {
        temp = decidePattern(doc, input[i], 'right', height, barcodeHeight, barcodeMargin);
        barcodeMargin += temp - barcodeMargin;
      }
      i++;
    }
    return doc;
  };
  return {
    pdfGenerate: function(signages, type) {
      var doc, i, index_end, index_signage, loop_count, signage, _i, _j, _k, _l, _len, _len1, _len2, _m, _n, _o;
      if (type === 'shelf') {
        index_signage = 0;
        loop_count = 0;
        for (_i = 0, _len = signages.length; _i < _len; _i++) {
          signage = signages[_i];
          doc = pdfInit(signage, index_signage, type, doc);
          if (index_signage % 12 === 11) {
            for (i = _j = 0; _j <= 11; i = ++_j) {
              console.log(signages[1 + i].barcodeText);
              doc = generateBarCode(doc, signages[loop_count * 12 + i].barcodeText, type, i);
            }
            loop_count += 1;
          }
          if (index_signage === signages.length - 1 && index_signage % 12 !== 11) {
            index_end = signages.length % 12 - 1;
            for (i = _k = 0; 0 <= index_end ? _k <= index_end : _k >= index_end; i = 0 <= index_end ? ++_k : --_k) {
              doc = generateBarCode(doc, signages[loop_count * 12 + i].barcodeText, type, i);
            }
          }
          index_signage++;
        }
        return doc;
      } else if (type === 'feature') {
        index_signage = 0;
        loop_count = 0;
        for (_l = 0, _len1 = signages.length; _l < _len1; _l++) {
          signage = signages[_l];
          doc = pdfInit(signage, index_signage, type, doc);
          if (index_signage % 4 === 3) {
            for (i = _m = 0; _m <= 3; i = ++_m) {
              console.log(signages[1 + i].barcodeText);
              doc = generateBarCode(doc, signages[loop_count * 4 + i].barcodeText, type, i);
            }
            loop_count += 1;
          }
          if (index_signage === signages.length - 1 && index_signage % 4 !== 3) {
            index_end = signages.length % 4 - 1;
            for (i = _n = 0; 0 <= index_end ? _n <= index_end : _n >= index_end; i = 0 <= index_end ? ++_n : --_n) {
              doc = generateBarCode(doc, signages[loop_count * 4 + i].barcodeText, type, i);
            }
          }
          index_signage++;
        }
        return doc;
      } else {
        index_signage = 0;
        for (_o = 0, _len2 = signages.length; _o < _len2; _o++) {
          signage = signages[_o];
          doc = pdfInit(signage, index_signage, type, doc);
          doc = generateBarCode(doc, signage.barcodeText, type, i);
          index_signage += 1;
        }
        return doc;
      }
    }
  };
}


exports = module.exports = utils;
