const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
const res = require('express/lib/response');

chai.use(chaiHttp);

suite('Functional Tests', function() {

    test('test 10L getrequest /convert', function ()  {
        chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=10l')
        .end(function (err, res) {
            assert.equal(res.status, 200)
            assert.equal(res.body.initNum, 10);
            assert.equal(res.body.initUnit, 'L');
            assert.equal(res.body.returnNum, 2.64172);
            assert.equal(res.body.returnUnit, 'gal');
        })
    });

    test('test invalid input 32g', function (){
        chai.request(server)
        .keepOpen()
            .get('/api/convert?input=32g')
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.text.replace(/"/g, ''), "invalid unit");
            });
    });

    test('test invalid number 3/7.2/4', function (){
        chai.request(server)
        .keepOpen()
        .get('/api/convert?input=3/7.2/4km')
        .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text.replace(/"/g, ''), 'invalid number');
        });
    });
 
    test('test invalid number and unit', function (){
        chai.request(server)
        .keepOpen()
        .get('/api/convert?input=3/7.2/4kilobytes')
        .end(function (err, res){
            assert.equal(res.status, 200);
            assert.equal(res.text.replace(/"/g, ''), "invalid number and unit")
        });
    });

    test('test 1 is returned when no number is input', function (){
        chai.request(server)
        .keepOpen()
        .get('/api/convert?input=km')
        .end(function (err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 1);
            assert.equal(res.body.initUnit, 'km');
            assert.equal(res.body.returnNum, .62137, 0.001);
            assert.equal(res.body.returnUnit, 'mi');
        });
    });

});
