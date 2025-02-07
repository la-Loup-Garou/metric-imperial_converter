const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
const res = require('express/lib/response.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

const url = 'https://3000-freecodecam-boilerplate-9xhmgm9fqwe.ws-us117.gitpod.io'

test('read whole numbers correctly', async function () {
    try {
      const res1 = await fetch(url + '/api/convert?input=1gal');
      const data1 = await res1.json()
      assert.approximately(data1.initNum, 1, 0.001);
      
        } catch (err) {
      throw new Error(err.responseText || err.message);
    }
});
 
    test('read decimal number input', async function () {
     try {
         
        const res2 = await fetch(url + '/api/convert?input=1.2mi');
        const data2 = await res2.json();
        assert.approximately(data2.initNum, 1.2, 0.001);
         
         } catch (err) {
        throw new Error(err.responseText || err.message);
      }
    });
    
    test('read fraction number input' , async function () {
     try {
         
       const res3 = await fetch(url + '/api/convert?input=1/2mi');
       const data3 = await res3.json();
       assert.approximately(data3.initNum, 0.5, 0.001);
       assert.equal(data3.returnUnit, 'km');
         
       } catch (err) {
        throw new Error(err.responseText || err.message);
       }
    });

    test('read fraction with decimal' , async function () {
     try {
             
       const res4 = await fetch(url + '/api/convert?input=1/2.1mi');
       const data4 = await res4.json();
       assert.approximately(data4.initNum, 0.47619, 0.001);

      } catch (err) {
        throw new Error(err.responseText || err.message);
      }
    });

    test('return error with double fraction',  async function () {
      try {
        const res5 = await fetch(url + '/api/convert?input=1//2mi');
        const data5 = await res5.text();
        assert.equal(data5, '"invalid number"');
        
      } catch (err) {
       throw new Error(err.responseText || err.message);
      }
    });

    test('return 1 when no numeric value entered',  async function () {
     try {
        const res6 = await fetch(url + '/api/convert?input=mi');
        const data6 = await res6.json();
        assert.equal(data6.initNum, 1);
        
      } catch (err) {
        throw new Error(err.responseText || err.message);
      }
    });

    test('read input units correctly',  async function () {
     try {
        const res1 = await fetch(url + '/api/convert?input=1mi');
        const data1 = await res1.json();
        assert.equal(data1.initUnit, 'mi');
        
        const res2 = await fetch(url + '/api/convert?input=1km');
        const data2 = await res2.json();
        assert.equal(data2.initUnit, 'km');

        const res3 = await fetch(url + '/api/convert?input=1gal');
        const data3 = await res3.json();
        assert.equal(data3.initUnit, 'gal');

        const res4 = await fetch(url + '/api/convert?input=1L');
        const data4 = await res4.json();
        assert.equal(data4.initUnit, 'L');

        const res5 = await fetch(url + '/api/convert?input=1lbs');
        const data5 = await res5.json();
        assert.equal(data5.initUnit, 'lbs');

        const res6 = await fetch(url + '/api/convert?input=1kg');
        const data6 = await res6.json();
        assert.equal(data6.initUnit, 'kg');

      } catch (err) {
        throw new Error(err.responseText || err.message);
      }
    });

    test('return invalid unit with invalid unit',  async function () {

      try {
        const res8 = await fetch(url + '/api/convert?input=2im');
        const data8 = await res8.text();
        assert.equal(data8, '"invalid unit"');
        
      } catch (err) {
        throw new Error(err.responseText || err.message);
      }
    });

    test('return correct return unit for each input unit',  async function () {

      try {
        const res1 = await fetch(url + '/api/convert?input=1mi');
        const data1 = await res1.json();
        assert.equal(data1.returnUnit, 'km');
        
        const res2 = await fetch(url + '/api/convert?input=1km');
        const data2 = await res2.json();
        assert.equal(data2.returnUnit, 'mi');

        const res3 = await fetch(url + '/api/convert?input=1gal');
        const data3 = await res3.json();
        assert.equal(data3.returnUnit, 'L');

        const res4 = await fetch(url + '/api/convert?input=1L');
        const data4 = await res4.json();
        assert.equal(data4.returnUnit, 'gal');

        const res5 = await fetch(url + '/api/convert?input=1lbs');
        const data5 = await res5.json();
        assert.equal(data5.returnUnit, 'kg');

        const res6 = await fetch(url + '/api/convert?input=1kg');
        const data6 = await res6.json();
        assert.equal(data6.returnUnit, 'lbs');
      } catch (err) {
        throw new Error(err.responseText || err.message);
      }
    });

      test('return correct string for each unit input',  async function () {

        try {
          const res1 = await fetch(url + '/api/convert?input=1mi');
          const data1 = await res1.json();
          const initUnitString1 = data1.string.split(' ')[1];
          assert.equal(initUnitString1, 'miles');
           
          const res2 = await fetch(url + '/api/convert?input=1km');
          const data2 = await res2.json();
          console.log('why the f wont you work', data2.initUnitString);
          const initUnitString2 = data2.string.split(' ')[1];
          assert.equal(initUnitString2, 'kilometers');
          
          const res3 = await fetch(url + '/api/convert?input=1gal');
          const data3 = await res3.json();
          const initUnitString3 = data3.string.split(' ')[1];
          assert.equal(initUnitString3, 'gallons');
          
          const res4 = await fetch(url + '/api/convert?input=1L');
          const data4 = await res4.json();
          const initUnitString4 = data4.string.split(' ')[1];
          assert.equal(initUnitString4, 'litres');
  
          const res5 = await fetch(url + '/api/convert?input=1lbs');
          const data5 = await res5.json();
          const initUnitString5 = data5.string.split(' ')[1];
          assert.equal(initUnitString5, 'pounds');
  
          const res6 = await fetch(url + '/api/convert?input=1kg');
          const data6 = await res6.json();
          const initUnitString6 = data6.string.split(' ')[1];
          assert.equal(initUnitString6, 'kilograms');
        } catch (err) {
          throw new Error(err.responseText || err.message);
        }
    });


    test ('correctly convert gal to L', async function () {
     try {
      const res = await fetch(url + '/api/convert?input=1gal')
      const data = await res.json();
      assert.approximately(data.returnNum, 3.78541, 0.001);
      assert.equal(data.returnUnit, 'L');
    }catch(err) {
      throw new Error(err.responseText || err.message);
    }
    });

    test('correctly convert L to gal', async function () {
      try{
      const res = await fetch(url + '/api/convert?input=1L');
     const data = await res.json();
     assert.approximately(data.returnNum, 0.26417, 0.001);
     assert.equal(data.returnUnit, 'gal');
      }catch(err) {
        throw new Error(err.responseText || err.message);
      };
    });
    
    test('correctly convert lbs to kg', async function () {
      try{
      const res = await fetch(url + '/api/convert?input=lbs');
     const data = await res.json();
     assert.approximately(data.returnNum, 0.45359, 0.001);
     assert.equal(data.returnUnit, 'kg');
      }catch(err) {
        throw new Error(err.responseText || err.message);
      };
    });

    test('correctly convert kg to lbs', async function () {
      try{
      const res = await fetch(url + '/api/convert?input=1kg');
     const data = await res.json();
     assert.approximately(data.returnNum, 2.20462, 0.001);
     assert.equal(data.returnUnit, 'lbs');
      }catch(err) {
        throw new Error(err.responseText || err.message);
      };
    });

    test('correctly convert mi to km', async function () {
      try{
      const res = await fetch(url + '/api/convert?input=1mi');
     const data = await res.json();
     assert.approximately(data.returnNum, 1.60934, 0.001);
     assert.equal(data.returnUnit, 'km');
      }catch(err) {
        throw new Error(err.responseText || err.message);
      };
    });

    test('correctly convert km to mi', async function () {
      try{
      const res = await fetch(url + '/api/convert?input=1km');
     const data = await res.json();
     assert.approximately(data.returnNum, .62137, 0.001);
     assert.equal(data.returnUnit, 'mi');
      }catch(err) {
        throw new Error(err.responseText || err.message);
      };
    });
});
