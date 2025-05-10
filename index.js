// Import Express
const express = require('express');

// Create the app
const app = express();

// Define the port
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});