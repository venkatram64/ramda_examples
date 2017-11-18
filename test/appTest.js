//const assert = require('chai').assert;
const chai = require('chai');
const app = require('../app');
const R = require('ramda');

const assert = chai.assert;
const should = chai.should();

var testData = require('./data.json');

//const sayHello = require('../app').sayHello;

//const addNumbers = require('../app').addNumbers;

describe('App', function(){

    describe('Ramda Realtime Demo', () =>{
        let isActive = R.propEq('isActive', true);
        let overThirty = R.pipe(
            R.prop('age'),
            (age) => age > 30
        );
        let activeOverThirty = R.pipe(
            R.filter(R.both(isActive, overThirty)),
            R.map(R.path(['name', 'first']))
        );
        it("first names of isActive=true and age > 30", () =>{
            activeOverThirty(testData).should.eql(['Patterson']);
        });

        //

        let excludedTags = ['proident'];
        let isExcludedTag = (tag) => R.any(R.equals(tag), excludedTags);

        let filterExcludedTags = R.reject(
            R.pipe(
                //R.tap(console.log),
                R.prop('tags'),
                //R.tap(console.log),
                R.any(isExcludedTag)
                //R.tap(console.log)
            )
        );

        it("reject any with excluded tags", () => {
            filterExcludedTags(testData).length.should.eql(2);
        })
    });

    describe('Ramda Demo', () =>{
        it('quick refresher on closure and currying', () =>{
            let addThree = (a) => (b) => (c) => a + b + c;
            addThree(1)(2)(3).should.eql(6);
        });

        it('Ramda currying', () =>{
            let addThreeNumber = R.curry((a,b,c) => a + b + c);
            let result = addThreeNumber(1,2,3);
            result.should.eql(6);
        });

        it('Ramda pipeline', () =>{

            let isEven = (x) => x % 2 == 0;
            let multiplyEven = R.pipe(
                R.filter(isEven),
                R.reduce(R.multiply,1)
            );
            multiplyEven(R.range(1,5)).should.eql(8);
        });

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