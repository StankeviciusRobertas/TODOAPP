// Simulating data from backend
var backendData = {
    city: "Vilnius",
    street: "Gedimino pr.",
    houseNumber: "15",
    flatNumber: "23"
};

// Populate input fields with backend data
document.getElementById("city").value = backendData.city;
document.getElementById("street").value = backendData.street;
document.getElementById("house-number").value = backendData.houseNumber;
document.getElementById("flat-number").value = backendData.flatNumber;

function saveUserInfo() {
    var userInfo = {
        city: document.getElementById("city").value,
        street: document.getElementById("street").value,
        houseNumber: document.getElementById("house-number").value,
        flatNumber: document.getElementById("flat-number").value
    };

    // You can now send userInfo to your backend endpoint
    console.log(userInfo);
}

function editUserInfo() {
    // Redirect to the desired page
    window.location.href = "http://127.0.0.1:5500/userInfoUpdate/userInfoUpdate.html"; // Replace "editUserInfoPage.html" with the desired page URL
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


//Get user info
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
                const fullName = data.name + ' ' + data.lastName; // Concatenate name and last name
                document.getElementById("full-name").textContent = fullName;
                document.getElementById("personal-code").textContent = "Personal Code: " + data.personalCode;
                document.getElementById("email").textContent = "Email: " + data.email;
                document.getElementById("phone-number").textContent = "Phone Number: " + data.phoneNumber;
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
                    throw new Error('Failed to load user info');
                }
            })
            .then(data => {
                document.getElementById("city").textContent = "City: " + data.city;
                document.getElementById("street").textContent = "Street: " + data.street;
                document.getElementById("house-number").textContent = "House Number: " + data.houseNumber;
                document.getElementById("flat-number").textContent = "Flat Number: " + data.flatNumber;
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