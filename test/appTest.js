//const assert = require('chai').assert;
const chai = require('chai');
const app = require('../app');
const process = require('../process');
const R = require('ramda');

const assert = chai.assert;
const should = chai.should();
const expect = chai.expect;

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
        });

        //

        let makeEmailHref = R.pipe(
            R.map(R.prop('email')),
            R.join(';'),
            R.concat('mailto:')
        );

        it("send an email to everybody", () =>{
            let expectedResult = `mailto:marcie.rollins@isosure.me;janie.donaldson@interloo.biz;rosanna.gonzales@turnabout.co.uk;patterson.compton@franscene.ca;deirdre.parrish@mantrix.biz`

            makeEmailHref(testData).should.eql(expectedResult);
        });

        //square code challenge
        let inputs = [
            'If man was meant to stay on the ground, God would have given us roots',
            'Have a nice day!',
            'Feed the dog.',
            'CHILL OUT!!!'
        ];
        let outputs = [
            'imtgdvs fearwer mayoogo anouuio ntnnlvt wttddes aohghn sseoau',
            'hae and via ecy',
            'fto ehg ee dd',
            'cl ho iu lt'
        ];

        let cleanInput = R.pipe(
            //R.tap(console.log),
            R.toLower,
            //R.tap(console.log),
            R.replace(/[\s.,!]/g,'')
            //R.tap(console.log)
        );
        it("clean input", () =>{
            cleanInput('HELLO!!  .....,,,').should.eql('hello');
        });

        //
        let determinNumberOfColumns = (input) => {
            let length = input.length;
            let columnsFor = R.pipe(
                //R.tap(console.log),
                Math.sqrt,
               // R.tap(console.log),
                Math.floor,
                //R.tap(console.log),
                R.divide(length),
                //R.tap(console.log),
                Math.ceil
            );
            return columnsFor(length);
        };

        it("determine number of columns", () => {
            let checkColumns = R.map(
                R.pipe(cleanInput, determinNumberOfColumns)
            );
            checkColumns(inputs).should.eql([8,4,4,4]);
        });

        //
        let turnIntoSquare = (columns) => R.splitEvery(columns);

        it("turn input into square", () => {
            let input = "haveaniceday";
            turnIntoSquare(4)(input).should.eql(
                [
                    'have',
                    'anic',
                    'eday'
                ]
            )
        });

        //
        let fillSquare = (columns) => R.map(
            R.ifElse(
                R.pipe(R.length, R.equals(columns)),
                R.identity,
                (row) => {
                    let fillSpaces = R.pipe(
                        R.length,
                        R.subtract(columns),
                        R.times(R.always(' ')),
                        //R.concat(row),//not working
                        R.join('')
                    );
                    return fillSpaces(row);
                }
            )
        );

        /*it.only("fill in spaces for any uneven rows", () => {
            let squareWithUnevenRows = [
                'feed',
                'thed',
                'og'
            ];

            fillSquare(4)(squareWithUnevenRows).should.eql(
                [
                    'feed',
                    'thed',
                    'og  '
                ]
            );
        });*/

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

    describe('youtubeVideos', function(){
        describe('Ramda youtubeVideos', () =>{
            const array = [
                {},
                { views: 99 },
                {},
                { views: 22 }
            ];

            it('test 1', function(){
                /*expect(app.getViews(array)).to.equal(
                    [ 99,
                     22 ]);*/
                app.getViews(array).should.have.lengthOf(2);
            });

            it('test 2', function(){
                /*expect(app.getViews(array)).to.equal(
                    [ 99,
                     22 ]);*/
                app.getViews2(array).should.have.lengthOf(2);
            });

            it('test 3', function(){
                /*expect(app.getViews(array)).to.equal(
                    [ 99,
                     22 ]);*/
                app.getViews3(array).should.have.lengthOf(2);
            });

            it('test 4', function(){
                /*expect(app.getViews(array)).to.equal(
                    [ 99,
                     22 ]);*/
                app.getViews4(array).should.have.lengthOf(2);
            });

            it('test 5', function(){
                const getViews5 = R.pipe(
                    R.filter(R.has('views')),
                    R.map(R.prop('views'))    
                );
                getViews5(array).should.have.lengthOf(2);
            });


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

    describe('Testing Process', function(){
        describe('All tests', function(){
            it("Lense view", () =>{
                let result = process.viewLense();
                assert.equal(result, 3);    
            });

            it("Lense set", () =>{
                let result = process.setLense();
                //assert.equal(result, 5);    
            });

            it("Lense over", () =>{
                let result = process.overLense();
                //assert.equal(result, 5);    
            });

            it("Lense Quotes", () =>{
                let result = process.quotesTest();
                //assert.equal(result, 5);    
            });

            it("Object literal", () =>{
                let result = process.resultOL();
            });

            it("Add test", () =>{
                let result = process.myAdder([1,2,3]);
                assert.equal(result, 6);
            });

            it("Spread Object test", () =>{
                let result = process.objSpread();
            });
            
        });

    });


});