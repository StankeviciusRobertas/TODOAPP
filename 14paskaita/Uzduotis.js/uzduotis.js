const arr = ["I", "study", "JavaScript", "right", "now"];
console.log(`Pilnas masyvas: `, arr);

let arrDelete = arr.splice(0, 3, "Lets", "dance");
console.log(`Pakeistas masyvas: `, arr);
console.log(`Tai kas buvo istrinta: `, arrDelete);

let joinedArr = arr.join('-');
console.log(`Sujungtas masyvas: `, joinedArr);

let joinedToString = arr.toString();
console.log(`Sudeta su "toString": `, joinedToString);

// --------------------------------------------------------

let first=['slice','splice','concat'];
let second = ['push', 'pop', 'shift', 'unshift']

let concatArr = first.concat(second);
console.log(`Sujungti masyvai: `);
console.log(concatArr);

concatArr[7] = "robertas";
concatArr[8] = 8;
let person = {
    face: {
        form: 'oval',
        color: 'pink',
        lenght: 5.0,
        width: 3.0,
        shadow: true, // seselis uz veido
    },
    eyes: {
        left: {
            color: 'white',
            width: 40,
            height: 40,
            pupil: {
                color: 'blue',
                width: 20,
                height: 20,
            },
            right: {
                color: 'red',
                width: 40,
                height: 40,
                pupil: {
                    color: 'blue',
                    width: 20,
                    height: 20,
                },
            },
        },
    nose: {
        color: 'pink',
        length: 7,
        width: 1,
        shadow: true, // seselis uz nosies
        form: 'elongated', // uzapvalinti kampai
        },
    mouth: {
        color: 'black',
        form: 'like ice hockey ball',
        },
    hair: {
        color: 'yellow',
        lenght: 5.0,
        width: 2.0,
        form: 'rounded', //uzapvalinti kampai
        foreHead: 'open' // matoma kakta
        }
    }
}
concatArr[9] = person;

console.log(`Pridetas string, number ir objektas`);
console.log(concatArr);

// -----------------------------------------------------------

let accords = ["D", "G", "C", "C7", "F"];
console.log("nepakeistas array");
console.log(accords);
function add7toG(accord) {
    if (accord.endsWith("7")) {
        return accord;
    }else {
        return accord + 7;
    }
    return accord;
}

let result = accords.map(add7toG);
console.log("Pridetas 7 prie G");
console.log(result);

// --------------------------------------------------------------

let numbers = [5, 1, 7, 2, -9, 8, 2, 7, 9, 4, -5, 2, -6, 8, -4, 6];

function createNewElement() {
    numbers.forEach(element => {
        console.log(element + 1);
        const paragraph = document.createElement('p');
        paragraph.innerHTML = element + 1;
        document.body.appendChild(paragraph);
    });
}
// const paragraph = document.createElement('p');
// paragraph.innerHTML = "Labas <b>vakaras</b> visiems."
// document.querySelector('#article-content').append(paragraph);

console.log(`ForEach su pridetu skaiciumi`);
console.log(createNewElement());