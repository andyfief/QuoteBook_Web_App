<h3>QuoteBook Web App</h3>

<p>QuoteBook is a simple web app where users can explore and share their favorite quotes from various categories such as Wisdom, Motivation, Love, and Humor. 
<p>This project was created for Oregon State University's CS290.</p>

<h2>Features</h2>
<strong>Browse Quotes by Category</strong>: Users can select from different categories to view related quotes.

<strong>User Login System</strong>: Users can log in to personalize their experience. Upon logging in, a personalized welcome message appears.

<strong>Dynamic Content with Handlebars.js</strong>: The app uses Handlebars.js templates to display categories and quotes dynamically.

<strong>JSON-Based Data Storage</strong>: Quotes are stored in a JSON file for easy access and management.

<strong>Client-Side Interactivity</strong>: The app provides basic interactivity, such as displaying login/logout options based on the user’s login status.


<h2>Technologies Used</h2>

<strong>HTML/CSS</strong>: For the structure and styling of the app.

<strong>JavaScript</strong>: For client-side logic, including login functionality, fetching data, and displaying quotes.

<strong>Handlebars.js</strong>: To handle templating for the quotes and categories display.

<strong>JSON</strong>: Used as a lightweight data storage solution for quotes.

<h2>Installation and Setup</h2>
Clone the repository to your local machine.

```
git clone https://github.com/your-username/quotebook-webapp.git
```

Navigate to the project directory.

```
cd quotebook-webapp
```
Serve the project with a local server. You can use any HTTP server, such as Live Server in Visual Studio Code or http-server in Node.js.

Open index.html in a web browser.

<h2>File Structure</h2>

<strong>index.html</strong>: The main landing page with navigation links.

<strong>quotes.html</strong>: Displays quotes based on the selected category.

<strong>login.html</strong>: Contains the login form.

<strong>style.css</strong>: Stylesheet for the application.

<strong>script.js</strong>: Handles client-side logic, such as login checks, category listing, and quotes display.

<strong>quoteData.json</strong>: JSON file storing quote data, organized by category.

<h2>Usage</h2>

<strong>Homepage</strong>: The homepage displays a brief description of the app and allows navigation.

<strong>Login</strong>: Use the login form to enter your credentials. User data is fetched from userData.json.

<strong>Quote Categories</strong>: Browse categories, select one to view all quotes in that category, and return to the main menu or log out as needed.
