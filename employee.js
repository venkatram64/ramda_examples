class Employee {
    constructor(name){
        this._name = name;
    }

    doWork(){
        return `${this._name} is working.`;
    }

    get name(){
        return this._name;
    }

    set name(someName){
        if(someName){
            this._name = someName;
        }
    }
}