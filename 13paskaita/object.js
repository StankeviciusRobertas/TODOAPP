console.log('*******************************');
console.log('*** Structure of an Object: ***');
console.log('*******************************');

let person = {
    name: 'Jonh Doe', // property name
    age: 30,          // property age
    greet: function () { //method greet
        console.log('Hello, I am ' + this.name);
    }
}

console.log(person);
person.greet();

//noriu issivesti name
console.log(person.name);

//noriu profesija prideti
person.profession = 'Developer';
console.log(person);

//noriu pakeisti person amziu
person.age = 31;
console.log(person);

//noriu istrinti person amziu
delete person.age;
console.log(person);

//noriu prideti property favorite color
person['favorite color'] = 'blue';
console.log(person);

