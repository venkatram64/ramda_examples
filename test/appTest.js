//const assert = require('chai').assert;
const chai = require('chai');
const app = require('../app');
const R = require('ramda');

const assert = chai.assert;
const should = chai.should();

//const sayHello = require('../app').sayHello;

//const addNumbers = require('../app').addNumbers;

describe('App', function(){

    describe('Ramda Demo', () =>{
        it('quick refresher on closure and currying', () =>{
            let addThree = (a) => (b) => (c) => a + b + c;
            addThree(1)(2)(3).should.eql(6);
        })

    });

    describe('sayHello()', function(){
        it('sayHello should return hello', function(){
            //assert.equal(app(), 'hello');
            //let result = sayHello();
            let result = app.sayHello();
            assert.equal(result, 'hello');
        });
    
        it('sayHello should return type string', function(){
            //let result = sayHello();
            let result = app.sayHello();
            assert.typeOf(result, 'string');
        });    
    });
    
    describe('addNumbers()', function(){
        it('addNumbers should be above 5', function(){
            //let result = addNumbers(5,5);
            let result = app.addNumbers(5,5);
            assert.isAbove(result,5);
        });
    
        it('addNumbers should return type number', function(){
            //let result = addNumbers(5,5);
            let result = app.addNumbers(5,5);
            assert.typeOf(result, 'number');
        });
    });
});