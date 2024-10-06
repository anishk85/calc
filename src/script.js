document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById('calc-display');
    const buttons = document.querySelectorAll(".btn");

    let currentInput = ''; // Stores the current input string

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            try {
                const buttonText = this.textContent.trim(); // Get the text of the clicked button

                // Handle AC (Clear all)
                if (buttonText === 'AC') {
                    currentInput = '';
                    display.value = ''; // Clear the display
                } 
                // Handle equal sign (Evaluate the expression)
                else if (buttonText === '=') {
                    try {
                        // Replace symbols and functions for evaluation
                        const expression = currentInput
                            .replace('÷', '/')
                            .replace('X', '*')
                            .replace(/sin\(([^)]+)\)/g, 'Math.sin($1 * Math.PI / 180)') // Convert to radians
                            .replace(/cos\(([^)]+)\)/g, 'Math.cos($1 * Math.PI / 180)') // Convert to radians
                            .replace(/tan\(([^)]+)\)/g, 'Math.tan($1 * Math.PI / 180)') // Convert to radians
                            .replace(/ln\(([^)]+)\)/g, 'Math.log($1)') // Natural log
                            .replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)') // Square root
                            .replace(/π/g, 'Math.PI') // Replace π with Math.PI
                            .replace(/e/g, 'Math.E') // Replace e with Math.E
                            .replace(/(\d+)!/g, 'factorial($1)'); // Replace x! with factorial function

                        const result = eval(expression); // Evaluate the expression
                        display.value = result; // Show the result in the display
                        currentInput = result.toString(); // Store the result for further operations
                    } catch (error) {
                        display.value = 'may be missing bracket'; // Display an error if the expression is invalid
                        currentInput = ''; // Reset currentInput after error
                    }
                } 
                // Handle regular button inputs (Numbers and operators)
                else {
                    // Append the button text to the current input
                    if (currentInput === '' && (buttonText === '+' || buttonText === '-' || buttonText === 'X' || buttonText === '÷')) {
                        // Prevent starting input with an operator
                        return; 
                    }
                    currentInput += buttonText; // Append the button text
                    display.value = currentInput; // Show the updated input in the display
                }
            } catch (error) {
                display.value = 'Error'; // Display an error if something goes wrong
                currentInput = ''; // Reset currentInput after error
            }
        });
    });
});

// Factorial function implementation
function factorial(n) {
    try {
        if (n < 0) return undefined; // Factorial for negative numbers is undefined
        if (n === 0 || n === 1) return 1; // Base case
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i; // Calculate factorial
        }
        return result; // Return factorial result
    } catch (error) {
        return undefined; // Return undefined if an error occurs
    }
}