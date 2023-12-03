// Import the readFileSync function from the 'fs' module to read files
import { readFileSync } from 'fs';

// Function to parse a text file and sum numbers created from the first and last digits of each line
function parseAndSum(filePath: string): number {
    // Read the entire file as a string using UTF-8 encoding
    const data = readFileSync(filePath, 'utf-8');
    // Split the file content into lines using regular expression to handle different line endings (CR+LF or LF)
    const lines = data.split(/\r?\n/);
    // Initialize a variable to hold the total sum
    let sum = 0;

    // Iterate over each line in the array
    lines.forEach((line) => {
        // Extract all digit characters from the line into an array
        const digits = line.match(/\d/g) || [];

        // Check if there is at least one digit in the line
        if (digits.length >= 1) {
            // Always use the first digit
            const firstDigit = digits[0];
            // Use the last digit if available, otherwise use the first digit again
            const lastDigit = digits.length > 1 ? digits[digits.length - 1] : firstDigit;
            // Concatenate the first and last digits and convert them to an integer
            const number = parseInt(firstDigit + lastDigit, 10);

            // Add the formed number to the total sum
            sum += number;
        }
    });

    // Return the total sum after processing all lines
    return sum;
}

// Path to the file to be processed (replace with your actual file path)
const filePath = './input.txt';
// Call the parseAndSum function and store the result in totalSum
const totalSum = parseAndSum(filePath);
// Output the total sum to the console
console.log(`Total sum: ${totalSum}`); 

