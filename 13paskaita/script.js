console.log('Hello masyvai');
let movies = [
    'Lord of the Rings',
    'Star Wars',
    'Green Mile',
    'RRR',
    'Samaritan',
    'Star Wars: Episode 2',
];
console.log(movies);

console.log('*********************');
console.log('*** Pridejimai ***');
console.log('*********************');
console.log('prideti i gala');

movies.push('Avatar');
movies.push('Boba Fett', 'Obi Wan');
console.log(movies);

console.log('Prideti i prieki');
movies.unshift('Terminator');
console.log(movies);

console.log('*********************');
console.log('*** Trynimai ***');
console.log('*********************');
console.log('trinti is galo');
movies.pop();
console.log(movies);
console.log()