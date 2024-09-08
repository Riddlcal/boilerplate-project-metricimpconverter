function ConvertHandler() {

  this.getNum = function(input) {
    let result;
    const num = input.match(/[.\d\/]+/g) || ["1"]; // Default to 1 if no number is provided
    if (num[0].includes('/')) {
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
    const unitMatch = input.match(/[a-zA-Z]+/); // Extract the unit part from the input
    if (!unitMatch) return 'invalid unit';
    
    let unit = unitMatch[0].toLowerCase(); // Normalize to lowercase for validation
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    
    if (validUnits.includes(unit)) {
      return unit === 'l' ? 'L' : unit; // Return 'L' for liters, others in lowercase
    } else {
      return 'invalid unit';
    }
  };

  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    return unitMap[initUnit.toLowerCase()] || 'invalid unit'; // Handle case insensitivity
  };

  this.spellOutUnit = function(unit) {
    const spellOutMap = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return spellOutMap[unit.toLowerCase()] || 'invalid unit';
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result;
    switch (initUnit.toLowerCase()) {
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
