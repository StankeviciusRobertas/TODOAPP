let userName = 'Robertas';

function showMessage() {
    userName = "Jonas";
    let message = "Hello " + userName;
    console.log(message);
}

console.log(userName);
showMessage();
console.log(userName);

console.log('---------------------');


function showMessage2(from, text) {
    console.log(from + ": " + text);
}

showMessage2('Robertas', 'sveiki visi');

console.log('---------------------');

function sum(a, b) {
    return a + b;
}

let result = sum(1, 2);
console.log(result)

console.log('---------------------');

function age(a) {
    if (a > 18)
    {
        return "Alert"
    }else if (a < 18)
    {
        var parentPermission = confirm('Do parents give permission to drink energy?');
        if (parentPermission) {
            return 'Permission granted to drink energy';
        } else {
            return 'Permission denied to drink energy';
        }
    }
}

let userAge = 15;
let result2 = age(userAge);
console.log(result2);

document.body.addEventListener("click", () => alert("Aciu kad paspaudete."));

elem.onclick = function() {
    alert('click on element with id')
}

buttonElement.addEventListener("click", () => alert("click on element with addEvenetListener"));

let doSomething = function () {
    console.log("doing something");
}

doSomething();