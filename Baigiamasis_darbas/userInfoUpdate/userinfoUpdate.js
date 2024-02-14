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
    document.getElementById("name-input").value = "";
    document.getElementById("surname-input").value = "";
    document.getElementById("personal-code-input").value = "";
    document.getElementById("email-input").value = "";
    document.getElementById("phone-number-input").value = "";
    document.getElementById("city-input").value = "";
    document.getElementById("street-input").value = "";
    document.getElementById("house-number-input").value = "";
    document.getElementById("flat-number-input").value = "";

    const token = sessionStorage.removeItem('token');
    // Redirect to the main page
    window.location.href = 'http://127.0.0.1:5500/index.html';
}

//Upload user photo
function handlePhotoUpload() {
    const fileInput = document.getElementById('profile-photo-input');
    const file = fileInput.files[0];

    if (file) {
        uploadUserPhoto(file);
    };
}

// Function to upload user photo
function uploadUserPhoto(file) {
    const token = sessionStorage.getItem('token');
    const userId = parseJwtForUserId(token);

    // Create formData object to send file
    const formData = new FormData();
    formData.append('Image', file);

    // Send request to upload photo
    fetch(`https://localhost:7032/api/Image/${userId}/Image`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })
        .then(response => {
            if (response.ok) {
                console.log('Photo uploaded successfully');
                location.reload();
            } else {
                throw new Error('Failed to upload photo');
            }
        })
        .catch(error => {
            console.error(error);
        });
}


document.getElementById('upload-photo-button').addEventListener('click', handlePhotoUpload);


//Create user info and adress
async function createUserInfo() {
    const token = sessionStorage.getItem('token');
    const userId = parseJwtForUserId(token);

    document.getElementById("create-button").addEventListener("click", createUserInfo);

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
        phoneNumber: document.getElementById("phone-number-input").value,
        email: document.getElementById("email-input").value,
    };


    // Create user address
    const attachUserAddress = fetch(`https://localhost:7032/api/UserAdress/${userId}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userAddress)
    }).then(response => {
        if (response.status === 201) {
            // Resource created successfully, no need to parse JSON
            return {};
        } else if (response.ok) {
            // Parse JSON data for other successful status codes
            return response.json();
        } else {
            throw new Error('Failed to update user address');
        }
    });

    // Create user info
    const attachUserInfo = fetch(`https://localhost:7032/api/UserInfo/${userId}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userInfo)
    }).then(response => {
        if (response.status === 201) {
            // Resource created successfully, no need to parse JSON
            return {};
        } else if (response.ok) {
            // Parse JSON data for other successful status codes
            return response.json();
        } else {
            throw new Error('Failed to update user address');
        }
    });

    try {
        await Promise.all([attachUserAddress, attachUserInfo]);
        window.location.href = 'http://127.0.0.1:5500/userInfo/userInfo.html';
    } catch (error) {
        console.error(error);
    }
}

//Updatinam info
async function saveUserInfo() {
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
        if (response.status === 204) {
            return {};
        } else if (response.ok) {
            // Parse JSON data for other successful status codes
            return response.json();
        } else {
            throw new Error('Failed to load user address');
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
        if (response.status === 204) {
            return {};
        } else if (response.ok) {
            // Parse JSON data for other successful status codes
            return response.json();
        } else {
            throw new Error('Failed to load user address');
        }
    });

    try {
        await Promise.all([updateUserAddress, updateUserInfo]);
        window.location.href = 'http://127.0.0.1:5500/userInfo/userInfo.html';
    } catch (error) {
        console.error(error);
    }
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
