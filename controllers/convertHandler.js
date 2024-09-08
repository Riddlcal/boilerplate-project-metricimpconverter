function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    // Use a regular expression to extract the number part from input
    const num = input.match(/[.\d\/]+/g) || ["1"]; // Default to 1 if no number is provided
    if (num[0].includes('/')) {
      // If a fraction, split it and divide
      const numbers = num[0].split('/');
      if (numbers.length > 2) {
        return 'invalid number';
      }
      result = parseFloat(numbers[0]) / parseFloat(numbers[1]);
    } else {
      result = parseFloat(num[0]);
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    // Extract the unit part from input using regular expression
    const unit = input.match(/[a-zA-Z]+/g);
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    
    if (unit && validUnits.includes(unit[0].toLowerCase())) {
      result = unit[0].toLowerCase() === 'l' ? 'L' : unit[0].toLowerCase();
    } else {
      result = 'invalid unit';
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'lbs': 'kg',
      'kg': 'lbs',
      'mi': 'km',
      'km': 'mi'
    };
    return unitMap[initUnit.toLowerCase()] || 'invalid unit';
  };

  this.spellOutUnit = function(unit) {
    const spellOutMap = {
      'gal': 'gallons',
      'L': 'liters',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'mi': 'miles',
      'km': 'kilometers'
    };
    return spellOutMap[unit.toLowerCase()] || 'invalid unit';
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result;
    switch(initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = 'invalid unit';
    }
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const spelledInitUnit = this.spellOutUnit(initUnit);
    const spelledReturnUnit = this.spellOutUnit(returnUnit);
    let result = `${initNum} ${spelledInitUnit} converts to ${returnNum} ${spelledReturnUnit}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
