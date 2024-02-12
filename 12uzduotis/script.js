// Uzdedam ivesties laukui blur pagal id
document.getElementById('number').addEventListener('blur', () => {
    //pagal id pasiemam ivesti
    var inputValue = document.getElementById('number'); 
    // sukuriam nauja paragrafa
    var newElement = document.createElement('p'); 
    //pasiemam formos elementa
    const form = document.querySelector('form');
    // trinam paragrafa jeigu jis egzistuoja
    const existingMessage = document.querySelector('form p');
    if (existingMessage) {
        existingMessage.remove();
    }

    // tikrinam ar elementas yra skaicius ir nepataiko i ribas 0-99
    if (isNaN(inputValue.value) || inputValue.value < 0 || inputValue.value > 99) {
        // priskiriam spalva 
        newElement.style.backgroundColor = 'red';
        newElement.style.color = 'white';
        // priskiriam zinute
        newElement.innerText = 'Tai yra ne skaicius ARBA mazesnis uz 0 ARBA didesnis uz 99, jus ivedete ' + inputValue.value;
        // isvedam i web'a zinute
        form.append(newElement);
    } else {
        // kitu atveju skaicius patenka 0-99, spalvinam zaliai ir isvedam teksta
        newElement.style.backgroundColor = 'green';
        newElement.style.color = 'white';
        newElement.innerText = 'Tai yra skaicius, tarp 0 ir 99';
        form.prepend(newElement);
    }
})

document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const userName = document.getElementById('user-name').value;
    console.log(event.target.userName.value);
    console.log(event.target.password.value);

    // if - jeigu userio slptazodis blogas - apendiname klaidos pranesima

    // jei user name ir password atitinka - nukreipiame useri i pagrindini puslapi. 
    window.location.href = './main-page.html';
})