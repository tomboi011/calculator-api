// Import Express
const express = require('express');
// Create the app
const app = express();


// Homepage route with simple welcome message
app.get('/', (_, res) => {
    res.send(`
    <h1>Calculator API</h1>
    <p>Usage: Calculate Numerical Operations</p>
    <p>Supported operations: add, subtract, multiply, divide</p>
    `);
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
