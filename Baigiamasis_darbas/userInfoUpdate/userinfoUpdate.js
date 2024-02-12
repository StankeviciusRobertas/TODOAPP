// Function to decode JWT token
function decodeToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    return payload;
}

// Function to parse JWT for userId
function parseJwtForUserId(token) {
    const decodedToken = decodeToken(token);
    return decodedToken.nameid;
}

function logout() {
    // Clear all input fields
    document.getElementById("city").value = "";
    document.getElementById("street").value = "";
    document.getElementById("house-number").value = "";
    document.getElementById("flat-number").value = "";
    document.getElementById("full-name").textContent = "";
    document.getElementById("personal-code").textContent = "";
    document.getElementById("email").textContent = "";
    document.getElementById("phone-number").textContent = "";

    // Redirect to the main page
    window.location.href = 'http://127.0.0.1:5500/index.html';
}


//Updatinam info
function saveUserInfo() {
    const token = sessionStorage.getItem('token');
    const userId = parseJwtForUserId(token);

    document.getElementById("save-button").addEventListener("click", saveUserInfo);

    var userAddress = {
        city: document.getElementById("city-input").value,
        street: document.getElementById("street-input").value,
        houseNumber: document.getElementById("house-number-input").value,
        flatNumber: document.getElementById("flat-number-input").value
    };

    var userInfo = {
        name: document.getElementById("name-input").value,
        lastName: document.getElementById("surname-input").value,
        personalCode: document.getElementById("personal-code-input").value,
        email: document.getElementById("email-input").value,
        phoneNumber: document.getElementById("phone-number-input").value
    };


    // Update user address
    const updateUserAddress = fetch(`https://localhost:7032/api/UserAdress/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userAddress)
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to update user address');
        }
    });

    // Update user info
    const updateUserInfo = fetch(`https://localhost:7032/api/UserInfo/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userInfo)
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to update user info');
        }
    });

    // Wait for both fetch requests to complete
    //Promise.all([updateUserAddress, updateUserInfo])
    //   .then(() => {
    //        console.log('User info updated successfully');
    //        // Redirect to userInfo.html page after both updates are successful
    //        window.location.href = 'http://127.0.0.1:5500/userInfo/userInfo.html';
    //    })
    //    .catch(error => {
    //        console.error('Error updating user info:', error);
    //    });

    window.location.href = 'http://127.0.0.1:5500/userInfo/userInfo.html';
}

//Create user info and adress
function createUserInfo() {
    const token = sessionStorage.getItem('token');
    const userId = parseJwtForUserId(token);

    document.getElementById("create-button").addEventListener("click", saveUserInfo);

    var userAddress = {
        city: document.getElementById("city-input").value,
        street: document.getElementById("street-input").value,
        houseNumber: document.getElementById("house-number-input").value,
        flatNumber: document.getElementById("flat-number-input").value
    };

    var userInfo = {
        name: document.getElementById("name-input").value,
        lastName: document.getElementById("surname-input").value,
        personalCode: document.getElementById("personal-code-input").value,
        email: document.getElementById("email-input").value,
        phoneNumber: document.getElementById("phone-number-input").value
    };


    // Update user address
    const updateUserAddress = fetch(`https://localhost:7032/api/UserAdress/${userId}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userAddress)
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to update user address');
        }
    });

    // Update user info
    const updateUserInfo = fetch(`https://localhost:7032/api/UserInfo/${userId}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userInfo)
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to update user info');
        }
    });

    // Wait for both fetch requests to complete
    //Promise.all([updateUserAddress, updateUserInfo])
    //   .then(() => {
    //        console.log('User info updated successfully');
    //        // Redirect to userInfo.html page after both updates are successful
    //        window.location.href = 'http://127.0.0.1:5500/userInfo/userInfo.html';
    //    })
    //    .catch(error => {
    //        console.error('Error updating user info:', error);
    //    });

    window.location.href = 'http://127.0.0.1:5500/userInfo/userInfo.html';
}


// Fetching data from the server
window.onload = () => {

    const token = sessionStorage.getItem('token');
    if (token) {
        const userId = parseJwtForUserId(token);

        // load user info
        fetch(`https://localhost:7032/api/UserInfo/${userId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to load user info');
                }
            })
            .then(data => {
                // Update user info in HTML
                document.getElementById("name-input").value = data.name;
                document.getElementById("surname-input").value = data.lastName;
                document.getElementById("personal-code-input").value = data.personalCode;
                document.getElementById("email-input").value = data.email;
                document.getElementById("phone-number-input").value = data.phoneNumber;
            })
            .catch(error => {
                console.error('Error:', error);
            });

        //loading user address
        fetch(`https://localhost:7032/api/UserAdress/${userId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to load user address');
                }
            })
            .then(data => {
                // Update user address in HTML
                document.getElementById("city-input").value = data.city;
                document.getElementById("street-input").value = data.street;
                document.getElementById("house-number-input").value = data.houseNumber;
                document.getElementById("flat-number-input").value = data.flatNumber;
            })
            .catch(error => {
                console.error('Error:', error);
            });

        //loading user photo
        fetch(`https://localhost:7032/api/Image/${userId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.blob();
                } else {
                    throw new Error('Failed to load user photo');
                }
            })
            .then(blob => {
                // Convert blob data to URL
                const imageUrl = URL.createObjectURL(blob);
                // Set the fetched image URL as the src attribute of the img tag
                document.getElementById("profile-photo").src = imageUrl;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}
