function ConvertHandler() {
  
  this.getNum = function(input) {

    const getNumRegex = /^(\d+(\.\d+)?(\/\d+(\.\d+)?)?)(?=[a-zA-Z]+)/
                         
    const match = input.match(getNumRegex);
    //check if !match and if input is just a unit returning 1 if so
    if (!match) {
      return  /^[a-zA-Z]+$/.test(input) ? 1 : 'invalid number';  
    }
    

  let num = match[0]

    // Handle fraction
      if (num.includes('/')) {
      let fractionParts = num.split('/');
      if (fractionParts.length !== 2 || fractionParts[1] === '0') return 'invalid number';
      num = parseFloat(fractionParts[0]) / parseFloat(fractionParts[1]);
    } else {
      num = parseFloat(num);
    }
    console.log(num)
    return isNaN(num) ? 'invalid number' : parseFloat(num.toFixed(5)); 
  };
  
  this.getUnit = function(input) {
     const unitRegex = /[a-zA-Z]+$/;
     
     const match = input.match(unitRegex);

     if (!match) {
      return null
     };

     const validUnits = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];

     let initUnit = match[0].toLowerCase();

     if(initUnit == 'l') {
       return 'L';
     };
       
     if (!validUnits.includes(initUnit)) {
      return 'invalid unit'
     }
        
     return validUnits.includes(initUnit) ? initUnit : null;
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
    return unitMap[initUnit] || 'invalid unit';
  };

  this.spellOutUnit = function(unit) {
     const unitNames = {
      'gal' : 'gallons',
      'L' : 'litres',
      'lbs' : 'pounds',
      'kg' : 'kilograms',
      'mi' : 'miles',
      'km' : 'kilometers',

     };
          return unitNames[unit];  
     };
    
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
     let result;

    switch (initUnit) {

      case 'gal':
       result = initNum * galToL; 
        break;
      case 'L':
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
          return 'invalid input';
      }
      return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(input) {

    const initNum = this.getNum(input);
    const initUnit = this.getUnit(input);
    const initUnitString = this.spellOutUnit(initUnit);
  
    
    if (initNum == 'invalid number' && initUnit == 'invalid unit'){
      return 'invalid number and unit'
    };
   
    if(initNum == 'invalid number') {
      return 'invalid number'
    };

    if(initUnit == 'invalid unit') {
      return 'invalid unit'
    };
    
    const returnNum = this.convert(initNum, initUnit);
    const returnUnit = this.getReturnUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);

 const string = `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`

    return {initNum, initUnit, returnNum, returnUnit, string};
    };
  };
   


const handler = new ConvertHandler();

 //console.log(handler.getString('2mi'));
 //console.log(handler.getString("3.1mi"));
 //console.log(handler.getString('2.5/6lbs'));
 //console.log(handler.getString('2min'));
 //console.log(handler.getString('2//3lbs'));
 //console.log(handler.getString('2///3bs'));
 //console.log(handler.getString('mi'))
 module.exports = ConvertHandler;

