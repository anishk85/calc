document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById('calc-display');
    const buttons = document.querySelectorAll(".btn");

    let currentInput = ''; // Stores the current input string

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            const buttonText = this.textContent.trim(); // Get the text of the clicked button

            // Handle AC (Clear all)
            if (buttonText === 'AC') {
                currentInput = '';
                display.value = ''; // Clear the display
            } 
            // Handle equal sign (Evaluate the expression)
            else if (buttonText === '=') {
                try {
                    currentInput = currentInput.replace('÷', '/').replace('X', '*'); // Replace symbols
                    const result = eval(currentInput); // Evaluate the expression
                    display.value = result; // Show the result in the display
                    currentInput = result.toString(); // Store the result for further operations
                } catch (error) {
                    display.value = 'Error'; // Display an error if the expression is invalid
                }
            } 
            // Handle regular button inputs (Numbers and operators)
            else {
                currentInput += buttonText; // Append the button text to the current input
                display.value = currentInput; // Show the updated input in the display
            }
        });
    });
});
