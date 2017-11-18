'use strict'

//const R = require('ramda');
import R from 'ramda';

const from10 = R.range(10);
const isEven = n => n % 2 === 0;
const square = n => n * n;
const sum = nums => nums.reduce((total, num) => total + num);
const length = nums => nums.length;
const avg = nums => sum(nums) / length(nums);

const avgEvenSquenceFrom10 = R.pipe(from10, R.filter(isEven), R.map(square), avg);
const result = avgEvenSquenceFrom10(21);
console.log("result ", result);

//currying
const add = x => y => x + y;
//or
/*function add(x) {
    return function(y){
        return x + y;
    }
}*/

const factorial = (n) => {
    if(n < 2){
        return 1;
    }
    return n * factorial(n - 1);
};
/*
    1 stack frame = 48B
    Max stack usage = 1MB
*/
/*
    (function a(x){
        if(!x){
            return;
        }
        a(--x);
    })(10);

*/
//Tail call optimization

const optimizedFactorial = (n, accum = 1) =>{
    if(n < 2) {
        return accum;
    }
    return optimizedFactorial(n - 1, n * accum);
};

let result1 = optimizedFactorial(100);

console.log("big factorial is ", result1);

