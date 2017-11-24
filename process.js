const R = require('ramda');
const fetch = require('node-fetch');

//install quokka.js
//https://www.youtube.com/watch?v=6cOsxaNC06c    
//above link is for how to debug nodejs in vc code
const dog = {
    name: 'fido',
    age: 3,
    weight: 20
};
const viewLense = () =>{
    const dogAge = R.lensProp('age');
    return R.view(dogAge, dog);
}

const setLense = () =>{
    const dogAge = R.lensProp('age');
    console.log( R.set(dogAge,5, dog));
}

const overLense = () =>{
    const dogAge = R.lensProp('age');
    console.log( R.over(dogAge,a => a + 5, dog));
}

const quotes = [
    {symbol: 'AAPL', amount: 150, name: 'Apple'},
    {symbol: 'GOOG', amount: 200, name: 'Google'},
    {symbol: 'MSFT', amount: 250, name: 'Microsoft'}
];

const quotesTest = () =>{
    const amtLens = R.lensProp('amount');
    const otherCurrency = R.over(amtLens, a => a * 1.7);
    const result = R.map(otherCurrency, quotes);
    console.log('result: ', result);
}

const numbers = [1,2,3];
const resultOL = () =>{
    const result = numbers.map(n => ({value:n}));
    console.log(result);
    return result;
}

const adder = {
    sum: 0,
    add(numbers){
        numbers.forEach( n =>{
            this.sum += n;
        });
    }
};

const myAdder = (numbers) =>{
    adder.add(numbers);
    return adder.sum;
}

const data = {age:50,designation:"Technical team lead"};


const objSpread = () =>{
    const dObj = {
        name: 'venkat',
        //...data
    };
    console.log(dObj);
}

//async wait

/*async getMatchset = (id) =>{
    try{
        let result = await axios.get(`/api/${id}`);
        return result
    }catch(err){
        console.error(err);
    }
}

async load(id){
    const [golfers, matches] = await Promise.all([
        api.getActiveGolfers(),
        api.getMatchset(id)
    ])
}

*/
//https://gist.github.com/mpj/3f8bc0c6ecda4294fbeff99f1e3fae85
const fetchAvatarUrl = async(userId) => {
    const response = await fetch(`https://catappapi.herokuapp.com/users/${userId}`);
    const data = await response.json();
    return data;
}

const data3 = fetchAvatarUrl(123);
console.log(data3);

const fetchAvatarUrl2 = (userId) => {
    return fetch(`https://catappapi.herokuapp.com/users/${userId}`)
        .then(response => {
            response.json();
        })
        .then(data => data.imageUrl);
}

const data4 = fetchAvatarUrl2(123);
console.log(data4);




module.exports = {
    viewLense: viewLense,
    setLense:setLense,
    overLense: overLense,
    quotesTest:quotesTest,
    resultOL:resultOL,
    myAdder: myAdder,
    objSpread:objSpread,
    fetchAvatarUrl:fetchAvatarUrl
}




