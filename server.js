const R = require('ramda');

const from10 = R.range(10);
const isEven = n => n % 2 === 0;
const square = n => n * n;
const sum = nums => nums.reduce((total, num) => total + num);
const length = nums => nums.length;
const avg = nums => sum(nums) / length(nums);

const avgEvenSquenceFrom10 = R.pipe(from10, R.filter(isEven), R.map(square), avg);
const result = avgEvenSquenceFrom10(21);
console.log("result ", result);