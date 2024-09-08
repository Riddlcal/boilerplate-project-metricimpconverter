'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    // Extract the input from the query parameter
    const input = req.query.input;

    // Use ConvertHandler methods to process the input
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    // If there is an invalid number or unit, return an error
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return res.json('invalid number and unit');
    } else if (initNum === 'invalid number') {
      return res.json('invalid number');
    } else if (initUnit === 'invalid unit') {
      return res.json('invalid unit');
    }

    // Convert the number and unit
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);

    // Get the full sentence describing the conversion
    const resultString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    // Return the conversion result as JSON
    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: resultString
    });
  });

};
