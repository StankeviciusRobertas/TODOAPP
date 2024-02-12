console.log('----- hello typeof -----');
console.log(typeof "kazkoks tekstas");
console.log(typeof 'Kazkoks tekstas');
console.log(typeof 15); //number
console.log(typeof 3.14); //number
console.log(typeof true); //boolean
console.log(typeof false); //boolean
console.log(typeof NaN); //number
console.log(typeof Infinity); //number
console.log(typeof -Infinity); //number
console.log(typeof null); //object
console.log(typeof undefined); //undefined
console.log(typeof myVariable); //undefined
console.log(typeof new Date()); //object
console.log(typeof [1, 2, 3]); //object
console.log(typeof { name: "Jonas", age: 15}); //object
console.log(typeof function () { }); //function
console.log(typeof Number(true));
console.log(typeof Number('25'));
console.log(`==> ${Number('AA')} yra ${typeof Number('AA')} <==`);

console.log("--- IS NaN ---");
console.log(isNaN('AA'));
console.log(isNaN('52'));


console.log('*** --- undefined su if --- ***');
if (typeof y === "undefined") {
    console.log("y is undefined");
} else {
    console.log("y is defined");
}

console.log('*** --- parseInt *** ---');
console.log(parseInt('25'));
console.log(parseInt('255 10 52'));
console.log(parseInt('40 years'));
console.log(parseInt('years 90'));
console.log(parseInt('          88              '));

