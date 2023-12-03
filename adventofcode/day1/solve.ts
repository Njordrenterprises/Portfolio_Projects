import * as fs from 'fs';
import * as readline from 'readline';

async function processFile(filePath: string): Promise<number> {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let sum = 0;

    for await (const line of rl) {
        sum += getCalibrationValue(line);
    }

    return sum;
}

function getCalibrationValue(line: string): number {
    // Map of spelled-out numbers to digits
    const numberWords = {
        zero: '0', one: '1', two: '2', three: '3', four: '4',
        five: '5', six: '6', seven: '7', eight: '8', nine: '9'
    };

    // Regular expression to find both digits and spelled-out numbers
    const numberRegex = new RegExp(`\\b(${Object.keys(numberWords).join('|')})\\b|\\d`, 'gi');

    let matches: string[] = [];

    // Extract all digits and spelled-out numbers
    let match;
    while ((match = numberRegex.exec(line)) !== null) {
        if (isNaN(parseInt(match[0]))) {
            // Convert spelled-out number to digit
            matches.push(numberWords[match[0].toLowerCase()]);
        } else {
            // Directly use the digit
            matches.push(match[0]);
        }
    }

    if (matches.length === 0) return 0; // No numeric values found

    // If only one numeric value is found, use it for both first and last
    if (matches.length === 1) {
        return parseInt(matches[0] + matches[0]);
    }

    // Use the first and last numeric values found
    return parseInt(matches[0] + matches[matches.length - 1]);
}

processFile('input.txt').then(sum => {
    console.log(`The sum of all calibration values is: ${sum}`);
}).catch(error => {
    console.error(`Error processing file: ${error.message}`);
});

