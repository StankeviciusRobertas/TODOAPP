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
    window.location.href = "http://127.0.0.1:5500/userInfoUpdate/userInfoUpdate.html";
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

    const token = sessionStorage.removeItem('token');
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

function isAdmin(token) {
    const decodedToken = decodeToken(token);
    const roles = decodedToken.role; // Assuming the roles are stored in the token as an array
    return roles.includes('admin');
}

//Get user info
window.onload = () => {

    //loading user info
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

        if (isAdmin(token)) {
            fetch(`https://localhost:7032/api/Accounts`, {
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
                        throw new Error('Failed to accounts');
                    }
                })
                .then(accounts => {
                    // Create header for the accounts
                    var header = document.createElement('h2');
                    header.textContent = 'Accounts';
                    document.getElementById('accounts-list').appendChild(header);

                    accounts.forEach(account => {
                        // Create a container div for each account
                        var accountContainer = document.createElement('div');
                        accountContainer.classList.add('account-container');

                        // Create a new paragraph element for the account information
                        var accountInfo = document.createElement('p');
                        accountInfo.textContent = `ID: ${account.id}, Name: ${account.userName}`;

                        if (account.role === 'admin') {
                            // If user is an admin, display "Admin" next to the name
                            accountInfo.textContent += ' (Admin)';
                        }

                        // Append the account information to the container
                        accountContainer.appendChild(accountInfo);

                        // Create a delete button icon
                        var deleteIcon = document.createElement('span');
                        deleteIcon.classList.add('delete-icon');
                        deleteIcon.textContent = '❌'; // Unicode character for the delete icon
                        deleteIcon.addEventListener('click', function () {
                            // Call a function to delete the account
                            deleteAccount(account.id);
                            // Remove the account container from the DOM
                            accountContainer.remove();
                        });

                        // Append the delete icon to the container
                        accountContainer.appendChild(deleteIcon);

                        // Append the container to the accounts list
                        document.getElementById('accounts-list').appendChild(accountContainer);
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            function deleteAccount(accountId) {
                // Construct the URL for the delete endpoint
                var deleteUrl = `https://localhost:7032/api/Accounts/${accountId}`;

                // Send a DELETE request to the server
                fetch(deleteUrl, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            // Account deleted successfully
                            console.log(`Account ${accountId} deleted successfully.`);
                        } else {
                            // Failed to delete the account
                            console.error('Failed to delete account.');
                        }
                    })
                    .catch(error => {
                        // Error handling
                        console.error('Error:', error);
                    });
            }
        }
    }
}