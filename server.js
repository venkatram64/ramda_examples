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
let s = add(5);
console.log("Currying add " + s(7));
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

//how to what becomes what

const mySum = (nums) => nums
        .map(x => x *x )
        .reduce((acc, c) => acc+c ,0);

console.log("My sum is " + mySum([1,2,3,4,5,6,7,8,9,10]));

/*
    Transformations
    filter,slice,map,reduce,concat,zip,fork,flatten

*/

const myEven = (x) => x%2 === 0;
const myHalf = (x) => x /2;
const myToAvg = (acc, c, i, arr) => (
    (i < arr.length - 1 ? acc + c : (acc + c) / arr.length)
    );

const mySumFilter = (nums) => nums
        .filter(myEven)
        .map(myHalf )
        .reduce(myToAvg);

console.log("My sum filter is " + mySumFilter([1,2,3,4,5,6,7,8,9,10]));



// destructuring

console.log(
    [
        {w:10, h:20, d:10},
        {w:3, h:2, d:20},
        {w:4, h:1, d:400},
        {w:9000, h:3999, d:9191},
    ].map(({w,h,d}) => w * h * d)
);

console.log(
    [
        {w:10, h:20, d:10},
        {w:3, h:2, d:20},
        {w:4, h:1, d:400},
        {w:9000, h:3999, d:9191},
    ].map((x) => x.w * x.h * x.d)
);

//flatten

console.log(
    [[1,2,3],[3,2,1],[5,2,1]].reduce((acc,cur) =>
        acc.concat(cur),[]
    )
);

//split every
const splitEvery = (chunkSize, arr) =>(
    arr.reduce((acc, curr,i) =>{
        const index = Math.floor(i/chunkSize);
        acc[index] = (acc[index] || []).concat(curr);
        return acc;
    },[])
);
console.log(splitEvery(3,[1,2,3,4,5,6,7,8,9]));

/*
    compose functions
*/
const compose = (...fns) =>(
    (x) => fns.reduceRight(
        (acc, curr) => curr(acc),x
    )
)

const doubleTheValues = compose(
    (x) => x * 2,
    (x) => x * x
);

console.log(
    doubleTheValues(10)
)

//Curry

const curry = (fn) => (...args) => (
    fn.length <= 1 || args.length > fn.length ? 
        fn(...args) : args.reduce((acc, curr) => 
                    curry(acc.bind(null, curr)), fn)
)

console.log(
    curry((a,b,c,d) => a + b + c +d)("Venkatram")(" ")("curried")("!")
);

//promise thunk waterfall

const waterfall = (...promiseThunks) =>(
    () => promiseThunks.reduce(
        (acc, curr) => acc.then(() => curr()),
            Promise.resolve()
        )
    );

waterfall(
    () => new Promise(
        (resolve) => setTimeout(
            () => resolve(console.log(1)), 1000
        )
    ),
    () => new Promise(
        (resolve) => setTimeout(
            () => resolve(console.log(2)), 1000
        )
    ),
    () => new Promise(
        (resolve) => setTimeout(
            () => resolve(console.log(3)), 1000
        )
    )
)();

