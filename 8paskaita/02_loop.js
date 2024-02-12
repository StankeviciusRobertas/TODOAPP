console.log('---hello loops-----');
console.log('---for');

//let str = ''; //rezultatas - 01234
//let str; //rezultatas - NaN
//let str = 0; //rezultatas - 10
let str = true; //rezultatas - 11
for (let i = 0; i < 5; i++) {
    str = str + i;
    console.log(i);
}
console.log(`rezultatas yra: ${str}`);

console.log('---for with step');
let str2 = '';
for (let i = 0; i < 9; i += 2) {
    str2 = str2 + i;
    console.log(i);
}
console.log(`rezultatas yra: ${str2}`);

console.log('---for with 4 step');
let str3 = '';
for (let i = 0; i < 17; i += 4) {
    str3 = str3 + i;
    console.log(i);
}
console.log(`rezultatas yra: ${str3}`);