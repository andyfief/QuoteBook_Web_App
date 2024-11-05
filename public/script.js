// Fetch user data from JSON file
function fetchUserData() {
    // Fetch user data from userData.json
    return fetch('userData.json')
        // Parse the response as JSON
        .then(response => response.json())
        // Catch any errors
        .catch(error => console.error('Error fetching user data:', error));
}

// Fetch quote data from JSON file
function fetchQuoteData() {
    // Fetch quote data from quoteData.json
    return fetch('quoteData.json')
        // Parse the response as JSON
        .then(response => response.json())
        // Catch any errors
        .catch(error => console.error('Error fetching quote data:', error));
}

// Check if user is logged in and display welcome message
function checkLoggedInUser() {
    // Retrieve username from cookie
    const username = getCookie('username');
    
    // get references to welcome message and login/logout
    const welcomeMessage = document.getElementById('welcome-message');
    const loginLogoutLink = document.getElementById('login-logout');

    // make sure they both elements exist before continuing
    if (welcomeMessage && loginLogoutLink) {

        if (username) {
            // if username exists, display welcome message and logout button
            const welcomeTemplate = Handlebars.compile('<p>Welcome, {{username}}!</p>');
            welcomeMessage.innerHTML = welcomeTemplate({ username });
            welcomeMessage.style.display = 'block';

            // set up event listener for logout button
            loginLogoutLink.innerHTML = '<a href="#" id="logout-button">Logout</a>';
            document.getElementById('logout-button').addEventListener('click', function () {
                // Clear username cookie and local storage, then redirect to index page
                document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                localStorage.removeItem('username');
                window.location.href = 'index.html';
            });
        } else {
            // if username doesn't exist, hide welcome message and display login link
            welcomeMessage.style.display = 'none';
            loginLogoutLink.innerHTML = '<a href="login.html">Login</a>';
        }
    }
}

// Get a cookie by name
function getCookie(name) {
    // get all cookies and prepend with a semicolon
    const value = `; ${document.cookie}`;
    // split the cookies into an array based on the provided name
    const parts = value.split(`; ${name}=`);
    // if there are two parts (the cookie exists) return it otherwise, return null
    return parts.length === 2 ? parts.pop().split(';').shift() : null;
}

// display login form
function displayLoginForm() {
    // get the login container 
    const loginContainer = document.getElementById('login-container');
    // check if container exists
    if (loginContainer) {
        // create the form template
        const loginFormTemplate = Handlebars.compile(`
            <form id="login-form">
                <div>
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <div class="error" id="username-error" style="display: none;">Username not found.</div>
                <div class="error" id="password-error" style="display: none;">Incorrect password.</div>
                <button type="submit">Login</button>
                <div class="error" id="login-error" style="display: none;">Invalid username or password.</div> <!-- new error message container -->
            </form>
        `);
        // set inner HTML to the compiled template
        loginContainer.innerHTML = loginFormTemplate();

        // add an event listener for the form submit
        document.getElementById('login-form').addEventListener('submit', function (event) {
            // prevent the default form submission
            event.preventDefault();
            // get username and password
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
        
            // hide all error messages before attempting login
            document.getElementById('username-error').style.display = 'none';
            document.getElementById('password-error').style.display = 'none';
            document.getElementById('login-error').style.display = 'none';
        
            // fetch user data from server
            fetchUserData().then(data => {
                // check if the username exists witin data
                if (data[username]) {
                    // if username exists, check if password matches
                    if (data[username].password === password) {
                        // if password matches, set username cookie and local storage item
                        document.cookie = `username=${username}; path=/;`;
                        localStorage.setItem('username', username);
                        // redirect to quotes page
                        window.location.href = 'quotes.html';
                    } else {
                        // if password does not match, show password error
                        document.getElementById('password-error').style.display = 'block'; // show password error
                    }
                } else {
                    // if username does not exist, show username error
                    document.getElementById('username-error').style.display = 'block'; // show username error
                }
            }).catch(error => {
                // if there's an error fetching user data, show generic login error
                console.error('Error fetching user data:', error);
                document.getElementById('login-error').style.display = 'block'; // show generic login error
            });
        });
    }
}

// event listener for when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // check if there is a user
    checkLoggedInUser();
    // display the login form
    displayLoginForm();
    // display categories
    displayCategories();

    // get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    // get the value of the 'category' paramete from the URL
    const category = urlParams.get('category');
    // if a category is specified in the URL, display quotes for that category
    if (category) {
        displayQuotesForCategory(category);
    }

    //adding a new quote
    handleAddQuote();
});

// Ddisplay categories
function displayCategories() {
    // fetch quote data 
    fetchQuoteData().then(data => {
        // get the category  list 
        const categoryList = document.getElementById('category-list');
        // check if category list exists
        if (categoryList) {
            // compile category template
            const categoryTemplate = Handlebars.compile(`
                {{#each categories}}
                    <li><a href="listQuotes.html?category={{this}}">{{this}}</a></li>
                {{/each}}
            `);
            // get all categories
            const categories = Object.keys(data);
            // set the HTML of category list to compiled one
            categoryList.innerHTML = categoryTemplate({ categories });
        }
    }).catch(error => console.error('Error fetching quote data:', error)); // log error if  quote data fails
}

// show quotes for a selected category
function displayQuotesForCategory(category) {
    // fetch quote data from server
    fetchQuoteData().then(data => {
        // get the quotes container
        const quotesContainer = document.getElementById('quotes-list');
        // check if quotes container exists
        if (quotesContainer) {
            // check if the category exists
            if (data[category]) {
                // compile quotes template
                const quotesTemplate = Handlebars.compile(`
                    <h2>Category: {{category}}</h2>
                    <ul>
                        {{#each quotes}}
                            <li>"{{this.quote}}" - {{this.author}}</li>
                        {{/each}}
                    </ul>
                `);
                // get the list of quotes for the specified category
                const quotes = data[category].quote_list;
                // set the HTML of quotes to the compiled one
                quotesContainer.innerHTML = quotesTemplate({ category, quotes });
            } else {
                // if no quotes found for the category, display a message
                quotesContainer.innerHTML = `<h2>No quotes found for category: ${category}</h2>`;
            }
        }
    }).catch(error => console.error('Error fetching quote data:', error)); // log error if fetching quote data fails
}

//  handle adding a new quote
function handleAddQuote() {
    // Get elements
    const addQuoteButton = document.getElementById('add-quote-button');
    const popupForm = document.getElementById('popup-form');
    const quoteForm = document.getElementById('quote-form');
    const cancelButton = document.getElementById('cancel-button');
    const errorContainer = document.getElementById('error-message'); // Add this line

    // Check if all elements exist
    if (addQuoteButton && popupForm && quoteForm && cancelButton && errorContainer) {
        // event listener for add quote button
        addQuoteButton.addEventListener('click', function () {
            popupForm.style.display = 'block';
        });

        // event listener for cancel button
        cancelButton.addEventListener('click', function () {
            popupForm.style.display = 'none';
            // hide error message when closing the form
            errorContainer.style.display = 'none'; 
        });

        // Add event listener for form submission
        quoteForm.addEventListener('submit', function (event) {
            event.preventDefault();
            // get quote and author
            const quote = document.getElementById('quote').value;
            const author = document.getElementById('author').value;

            // check if both fields are filled
            if (quote && author) {
                // Simulate adding the new quote to the data
                const newQuote = { quote, author };

                // add the new quote to the quotes container
                const quotesContainer = document.getElementById('quotes-list');
                const newQuoteTemplate = Handlebars.compile(`
                    <li>"{{quote}}" - {{author}}</li>
                `);
                quotesContainer.innerHTML += newQuoteTemplate(newQuote);

                // hide the popup form and error message
                popupForm.style.display = 'none';
                errorContainer.style.display = 'none';
            } else {
                // If either field is empty, display error message
                errorContainer.style.display = 'block';
            }
        });
    }
}