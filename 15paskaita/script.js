document.getElementById('add-to-session-store')
    .addEventListener('click', () => {
        sessionStorage.setItem("test", 1);
    });

    document.getElementById('add-to-local-store')
    .addEventListener('click', () => {
        sessionStorage.setItem("test local storage", "Sveiki visi. ");
    });

    //------------------------------------------------------------------------

window.onload = () => {
    document.getElementById('number').addEventListener('keyup', (event) => {
        const inputValue = event.target.value;
        const h2Element = document.querySelector('form h2');
        h2Element.textContent = `${inputValue}`;
    });

    document.getElementById('myForm').addEventListener('submit', (event) => {
        event.preventDefault();
    
        const inputValue = document.getElementById('number').value;
        localStorage.setItem('enteredText', inputValue);
    });
}
// ---------------------------------------------------------------------------------

let namesArray =
    [
        {
            "name": "Amy",
            "age": 18,
            "online": false,
            "languages": ["English", "Lithuania", "German"]
        }
    ];

    console.log(JSON.stringify(namesArray));

let namesArrayFromJson = JSON.parse('[{"name":"Amy","age":18,"online":false,"languages":["English","Lithuania","German"]}]');
console.log(namesArrayFromJson);

//console.log(namesArrayFromJson[0]).online;

localStorage.setItem("namesArray", JSON);

// --------------------------------------------------------

window.onload = () => {
    document.getElementById('number2').addEventListener('keyup', (event) => {
        const inputValue = event.target.value;
        const h2Element = document.querySelector('form h2');
        h2Element.textContent = `${inputValue}`;
    });

    document.getElementById('myForm2').addEventListener('submit', (event) => {
        event.preventDefault();
    
        const inputValue = document.getElementById('number2').value;
        localStorage.setItem('enteredText', inputValue);
    });
}