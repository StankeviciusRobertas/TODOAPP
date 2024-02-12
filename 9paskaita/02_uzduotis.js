let palindromas = "ABBA";
let masyvas = palindromas.split('');

console.log(masyvas); // ["A", "B", "B", "A"]
let answer;
for (let i = 0; i < masyvas.length; i++) {
    if (masyvas[i] === masyvas[masyvas.length - 1 - i]) {
        answer = true;
    } else {
        answer = false;
    }
}
if (answer === true)
    {
        console.log(`Zodis ${palindromas} ---- Yra palindromas ---`);
    } else if(answer === false) {
        console.log(`Zodis ${palindromas} --- Nera palindromas ---`);
    }

    let palindromas2 = "MAMA";
    let masyvas2 = palindromas2.split('');
    
    console.log(masyvas2); // ["M", "A", "M", "A"]
    
    for (let i = 0; i < masyvas2.length; i++) {
        if (masyvas2[i] === masyvas2[masyvas2.length - 1 - i]) {
            answer = true;
        } else {
            answer = false;
        }
}
if (answer === true)
{
    console.log(`Zodis ${palindromas2} ---- Yra palindromas ---`);
} else if(answer === false) {
    console.log(`Zodis ${palindromas2} --- Nera palindromas ---`);
}

