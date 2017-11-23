//https://www.youtube.com/watch?v=hO7mzO83N1Q

work = (name) => {
    return `${name} is working.`;
}
class Person {
    constructor(name){
        this.name = name;
    }

    doWork(){
        return work(this.name);
    }
}

export {work, Person}
export default Person