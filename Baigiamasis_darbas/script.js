const formOpenBtn = document.querySelector("#form-open"),
    home = document.querySelector(".home"),
    formContainer = document.querySelector(".form_container"),
    formCloseBtn = document.querySelector(".form_close"),
    signupBtn = document.querySelector("#signup"),
    registerBtn = document.querySelector("#register"),
    loginBtn = document.querySelector("#login"),
    pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

pwShowHide.forEach((icon) => {
    icon.addEventListener("click", () => {
        let getPwInput = icon.parentElement.querySelector("input");
        if (getPwInput.type === "password") {
            getPwInput.type = "text";
            icon.classList.replace("uil-eye-slash", "uil-eye");
        } else {
            getPwInput.type = "password";
            icon.classList.replace("uil-eye", "uil-eye-slash");
        }
    });
});

signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.add("active");
});
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.remove("active");
});



// Fetching data from the server
window.onload = () => {

    document.getElementById('login').addEventListener("click", (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch(`https://localhost:7032/api/Accounts/Login`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    return Promise.reject(`Vartotojas arba slaptazodis yra netinkami`);
                }
            })
            .then(result => {
                const token = result; // Extract the token directly from the response text
                sessionStorage.setItem('userName', username);
                sessionStorage.setItem('token', token);
                // Redirect to the user info page
                window.location.href = 'http://127.0.0.1:5500/userInfo/userInfo.html';
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
                while (errorContainer.firstChild) {
                    errorContainer.removeChild(errorContainer.firstChild);
                }
            });
    });

    // SIGNUP 
    registerBtn.addEventListener("click", (event) => {
        event.preventDefault();

        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;

        //sessionStorage.setItem('userName', fname);


        fetch(`https://localhost:7032/api/Accounts/SignUp`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.text().then(errorMessage => {
                        throw new Error(errorMessage);
                    });
                }
            })
            .then(result => {
                // close the Signup form
                formContainer.classList.remove("active");

                // Clear the error container
                const errorContainer = document.getElementById('error-container');
                errorContainer.innerHTML = '';
                //Open the Login Form
                home.classList.add("show");
            })
            .catch(error => {
                const errorMessage = error.message; // Get the error message from the Error object
                const usernameRegex = /`([^`]+)`/; // Regular expression to extract username between backticks
                const match = errorMessage.match(usernameRegex); // Match the username in the error message

                // Create a new paragraph element
                const newElement = document.createElement('p');
                newElement.style.backgroundColor = 'red';
                newElement.style.color = 'white';

                // Check if a match is found
                if (match && match.length > 1) {
                    const existingUsername = match[1]; // Extract the username from the match
                    // Assign the error message
                    newElement.innerText = `User '${existingUsername}' already exists!`;
                } else {
                    // Assign the entire error message
                    newElement.innerText = errorMessage;
                }

                // Append the error message to the error container
                const errorContainer = document.getElementById('error-container');
                errorContainer.innerHTML = ''; // Clear existing errors
                errorContainer.appendChild(newElement);
            });
    });
}

