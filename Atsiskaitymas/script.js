window.onload = () => {

    document.getElementById('login').addEventListener("click", (event) => {
        event.preventDefault();

        const fname = document.getElementById('fname').value;
        const ltname = document.getElementById('ltname').value;

        //sessionStorage.setItem('userName', fname);


        fetch(`https://localhost:7171/api/Auth?username=${fname}&password=${ltname}`,
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(`Vartotojas arba slaptazodis yra netinkami`);
                }
            })
            .then(result => {
                console.log(result);
                console.log('Login successful');

                const userId = result.id;

                sessionStorage.setItem('userName', fname);
                sessionStorage.setItem('userId', userId);
                //redirectToToDoApp(result.userName); 
                window.location.href = 'http://127.0.0.1:5500/Atsiskaitymas/todo-form/todo.html';
            })
            .catch(error => {
                var newElement = document.createElement('p');
                newElement.style.backgroundColor = 'red';
                newElement.style.color = 'white';
                // priskiriam zinute
                newElement.innerText = 'Vartotojas arba slaptazodis yra netinkami ';
                // isvedam i web'a zinute
                const form = document.getElementById('error-container');
                form.append(newElement);
                //alert("Neteisingas user name arba slaptazodis");
                const errorContainer = document.getElementById('error-container');

                // Isvalom pries tai buvusius error
                while (errorContainer.firstChild) {
                    errorContainer.removeChild(errorContainer.firstChild);
                }

                // Append naujus error
                errorContainer.appendChild(newElement);
            });
    });
    document.getElementById('register').addEventListener("click", (event) => {
        event.preventDefault();

        console.log("Nenukreipia i register page");
        window.location.href = 'http://127.0.0.1:5500/Atsiskaitymas/registration-from/registration.html';
    });
}
