// Import Express
const express = require('express');

// Import readline to read user input from terminal
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Create Express app
const app = express();

// Store last calculation
let lastCalculation = { num1: null, num2: null, operation: null, result: null };

// Homepage route with welcome message and showing last calculation
app.get('/', (_, res) => {
    const { num1, num2, operation, result } = lastCalculation;
    
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Calculator API</title>
        <style>
            body { margin: 0; padding: 0; font-family: Arial; 
                    display: flex; justify-content: center; align-items: center; 
                    height: 100vh; background: rgb(46, 165, 159); }
            .container { text-align: center; padding: 40px; 
                        background: white; border-radius: 12px; 
                        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); }
            h1 { font-size: 2.5rem; color: #2c3e50; }
            .result { background: #f8f9fa; padding: 20px; 
                        border-radius: 8px; margin: 20px 0; }
            code { background: #ecf0f1; padding: 2px 6px; 
                    border-radius: 4px; color: #e74c3c; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🧮 Calculator API</h1>
            <div class="result">
                <h2>Last Calculation</h2>
                ${lastCalculation.result ? `
                    <p>${num1} ${operation} ${num2} = <strong>${result}</strong></p>
                ` : '<p>No calculations yet. Use the terminal first!</p>'}
            </div>
            <p>Supported operations: 
                <code>add</code>, <code>subtract</code>, 
                <code>multiply</code>, <code>divide</code>
            </p>
        </div>
    </body>
    </html>
    `);
});


// Function to do calculation
function calculate(num1, num2, operation) {
    if (operation === 'add') return num1 + num2;
    if (operation === 'subtract') return num1 - num2;
    if (operation === 'multiply') return num1 * num2;
    if (operation === 'divide') {
        return num2 !== 0 ? num1 / num2 : 'Error: Division by zero';
    }
    return 'Invalid operation';
}


// Function to ask user input in terminal
function UserPrompt() {
    readline.question('Enter the first number: ', (num1) => {
        readline.question('Enter the second number: ', (num2) => {
            readline.question('Choose operation (add, subtract, multiply, divide): ', (operation) => {
                const n1 = parseFloat(num1);
                const n2 = parseFloat(num2);
                if (isNaN(n1) || isNaN(n2)) {
                    console.log('❌ Invalid number input.\n');
                    return UserPrompt();
                }
                const result = calculate(n1, n2, operation);
                lastCalculation = { num1: n1, num2: n2, operation, result };
                console.log(`✅ Result: ${result}\n`);
                UserPrompt(); // Loop again
            });
        });
    });
}

// Start Express server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🌐 Server is running on http://localhost:${PORT}`);
    console.log(`🖥️ You can also try the calculator in this terminal:\n`);
    UserPrompt(); // Start CLI calculator
});