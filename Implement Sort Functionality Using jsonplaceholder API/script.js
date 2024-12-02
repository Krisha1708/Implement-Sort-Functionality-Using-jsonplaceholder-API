const URL = 'https://jsonplaceholder.typicode.com/users';

// Default sort order (ascending)
let currentSort = 'asc';

// Fetch and display user data based on sorting
const fetchUsers = async (sortOrder) => {
    try {
        // Fetch data from the API with sorting query parameter
        const response = await fetch(`${URL}?_sort=name&_order=${sortOrder}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        // Parse the response data
        const users = await response.json();
        console.log(users);

        // Display the user data
        displayUsers(users);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data, please try again later.');
    }
};

// Display the user data in the DOM
const displayUsers = (users) => {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';  // Clear the list before adding new users

    // Loop through the users and create user items
    users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.classList.add('user-item');

        // Display user details
        userItem.innerHTML = `
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Website: <a href="http://${user.website}" target="_blank">${user.website}</a></p>
        `;

        // Append the user item to the list
        userList.appendChild(userItem);
    });
};

// Sort functionality
let sort = document.getElementById("sort");
sort.addEventListener("change", function () {
    // Get the selected sorting order
    currentSort = sort.value;
    
    // Fetch the users with the new sort order
    fetchUsers(currentSort);
});

// Fetch users when the page loads with default sort order (ascending)
fetchUsers(currentSort);
