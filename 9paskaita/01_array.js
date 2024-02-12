console.log('*** --- array --- ***');
const arr = [1, 2, 3, 4, 5];
console.log(arr);
const arr1 = [1, 'du', 3, false, 5]
console.log(arr1);

console.log(arr1[1]);
console.log(arr1[2]);
console.log(arr1.length);
console.log("---------------");
console.log(arr1);
arr1[5] = "penktas";
arr1[6] = "sestas";
console.log(arr1);
console.log(arr1.length);

console.log("-for---------");
for (let i = 0; i < arr1.length; i++) {
    console.log(arr1[i]);
}

console.log("-for of---------");
for (let item of arr1) {
    console.log(item);
}

