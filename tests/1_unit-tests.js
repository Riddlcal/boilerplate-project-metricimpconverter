const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  // Whole number input
  test('convertHandler should correctly read a whole number input', function() {
    assert.equal(convertHandler.getNum('32L'), 32);
  });

  // Decimal number input
  test('convertHandler should correctly read a decimal number input', function() {
    assert.equal(convertHandler.getNum('3.1mi'), 3.1);
  });

  // Fractional input
  test('convertHandler should correctly read a fractional input', function() {
    assert.equal(convertHandler.getNum('1/2kg'), 0.5);
  });

  // Fractional input with a decimal
  test('convertHandler should correctly read a fractional input with a decimal', function() {
    assert.equal(convertHandler.getNum('5.4/3lbs'), 1.8);
  });

  // Double-fraction (invalid input)
  test('convertHandler should return an error on a double-fraction (i.e. 3/2/3)', function() {
    assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid number');
  });

  // Default to 1 when no numerical input
  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function() {
    assert.equal(convertHandler.getNum('kg'), 1);
  });

  // Valid input units
  test('convertHandler should correctly read each valid input unit', function() {
    const inputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    inputUnits.forEach(unit => {
      assert.equal(convertHandler.getUnit(unit), unit.toLowerCase() === 'l' ? 'L' : unit);
    });
  });

  // Invalid input unit
  test('convertHandler should return an error for an invalid input unit', function() {
    assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
  });

  // Correct return unit for valid input unit
  test('convertHandler should return the correct return unit for each valid input unit', function() {
    const inputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const expectedReturnUnits = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
    inputUnits.forEach((unit, index) => {
      assert.equal(convertHandler.getReturnUnit(unit), expectedReturnUnits[index]);
    });
  });

  // Spelled-out string unit for each valid input unit
  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function() {
    const inputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const expectedSpelledOutUnits = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
    inputUnits.forEach((unit, index) => {
      assert.equal(convertHandler.spellOutUnit(unit), expectedSpelledOutUnits[index]);
    });
  });

  // Conversion tests
  test('convertHandler should correctly convert gal to L', function() {
    assert.approximately(convertHandler.convert(5, 'gal'), 18.9271, 0.1);
  });

  test('convertHandler should correctly convert L to gal', function() {
    assert.approximately(convertHandler.convert(5, 'L'), 1.32086, 0.1);
  });

  test('convertHandler should correctly convert mi to km', function() {
    assert.approximately(convertHandler.convert(5, 'mi'), 8.0467, 0.1);
  });

  test('convertHandler should correctly convert km to mi', function() {
    assert.approximately(convertHandler.convert(5, 'km'), 3.10686, 0.1);
  });

  test('convertHandler should correctly convert lbs to kg', function() {
    assert.approximately(convertHandler.convert(5, 'lbs'), 2.26796, 0.1);
  });

  test('convertHandler should correctly convert kg to lbs', function() {
    assert.approximately(convertHandler.convert(5, 'kg'), 11.0231, 0.1);
  });

});
