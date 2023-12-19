window.onload = () => {

    document.getElementById('register').addEventListener('click', (event) => {
        event.preventDefault();
        console.log('creating new post');

        const fname = document.getElementById('fname').value;
        const ltname = document.getElementById('ltname').value;
        const email = document.getElementById('email').value;

        const userData = {
            userName: fname,
            password: ltname,
            email: email
        };

        fetch('https://localhost:7171/api/Auth',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create user');
                }
                return response.text(); // read the response as text
            })
            .then(result => {
                console.log(`Vartotojas sukurtas`);
                var newElement = document.createElement('p');
                newElement.style.backgroundColor = 'green';
                newElement.style.color = 'white';
                // priskiriam zinute
                newElement.innerText = `Vartotojas ${fname} sukurtas sekmingai`;
                // isvedam i web'a zinute

                const errorContainer = document.getElementById('error-container');

                errorContainer.innerHTML = '';
                errorContainer.appendChild(newElement);

                setTimeout(() => {
                    // Redirect to the login page after 3 seconds
                    window.location.href = 'http://127.0.0.1:5500/Atsiskaitymas/index.html';
                }, 3000);

            })
            .catch(error => {
                console.log(`Klaida: ${error}`);
                var newElement = document.createElement('p');
                newElement.style.backgroundColor = 'red';
                newElement.style.color = 'white';
                newElement.innerHTML = error;
                // priskiriam zinute
                const errorContainer = document.getElementById('error-container');

                // Clear existing errors
                while (errorContainer.firstChild) {
                    errorContainer.removeChild(errorContainer.firstChild);
                }

                // Append the new error message
                errorContainer.appendChild(newElement);
            });
    })
}