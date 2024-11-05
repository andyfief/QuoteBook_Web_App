'use strict';

// import required modules
const express = require('express');
const cookieParser = require('cookie-parser');

// create express app
const app = express();

// set the port number
const PORT = process.env.PORT || 4000;

// middleware setup
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static('public')); // Serve static files from 'public
app.use(cookieParser()); // Parse cookies

// HTML templates
let htmlHeader = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quotation Web App</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Quotation Web App</h1>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/quotes">Quotes</a></li>
                <li><a href="/login">Login</a></li>
            </ul>
        </nav>
    </header>
    <main>
`;

// Home route
app.get('/', (req, res) => {
    res.send(`
        ${htmlHeader}
        <section>
            <h2>Welcome to Quotation Web App</h2>
            <p>This is the main page.</p>
        </section>
        ${htmlFooter}
    `);
});

// Login route
app.get('/login', (req, res) => {
    //display login form
    res.send(`
        ${htmlHeader}
        <section>
            <h2>Login</h2>
            <form action="/login" method="POST">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required><br>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required><br>
                <button type="submit">Login</button>
            </form>
        </section>
        ${htmlFooter}
    `);
});

// Login POST route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // read user data from userData.json
    const userData = require('./userData.json');

    // check if the username exists in userData and if the provided password matches
    if (userData[username] && userData[username].password === password) {
        // set username as a cookie
        res.cookie('username', username, { maxAge: 900000, httpOnly: true }); // Cookie expires after 15 minutes
        // redirect to quotes page
        res.redirect('/quotes');
    } else {
        // if login is unsuccessful, display error messages on the login page
        res.send(`
            ${htmlHeader}
            <section>
                <h2>Login</h2>
                <div class="error" id="login-error">Incorrect username or password.</div>
                <form action="/login" method="POST">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required><br>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required><br>
                    <button type="submit">Login</button>
                </form>
            </section>
            ${htmlFooter}
        `);
    }
});

// quotes route
app.get('/quotes', (req, res) => {
    // Retrieve quote categories from JSON data file and generate the list
    let categories = ['Inspirational', 'Motivational', 'Life', 'Love', 'Funny'];
    let categoryList = categories.map(category => `<li><a href="/quotes/${category}">${category}</a></li>`).join('');
    
    // display the categories
    res.send(`
        ${htmlHeader}
        <section>
            <h2>Quote Categories</h2>
            <ul>${categoryList}</ul>
        </section>
        ${htmlFooter}
    `);
});

// quotes by category route
app.get('/quotes/:category', (req, res) => {
    const category = req.params.category;
    // Retrieve quotes for the specified category from JSON data file, display them
    res.send(`
        ${htmlHeader}
        <section>
            <h2>Quotes in ${category}</h2>
            <p>This is the page for quotes in the ${category} category.</p>
        </section>
        ${htmlFooter}
    `);
});

// start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})