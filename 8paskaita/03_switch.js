console.log('---hello switch-----');

const date = new Date('2024-01-03');
const today = date.getDay();
let day;
console.log(today);

switch (today) {
    case 0:
        day = 'Sekmadienis';
        break;
    case 1:
        day = 'Pirmadienis';
        break;
    case 2:
        day = 'Antradienis';
        break;
    case 3:
        day = 'Treciadienis';
        break;
    //.........
    
    default:
        day = '-- Neatpazinta diena --';
        break;
}
console.log(`${today} yra -- ${day} --`);

console.log('--- switch with number -----');
let x = '0';
let text;
switch (x) {
    case 0:
        text = 'off';
        break;
    case 1:
        text = 'On';
        break;
    case '0':
        text = 'TEKSTAS';
        break;
    
    default:
        text = 'No value found';
        break;
}
console.log(`-- ${text} --`);