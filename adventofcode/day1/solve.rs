import { readFileSync } from 'fs';

function parseAndSum(filePath: string): number {
    const data = readFileSync(filePath, 'utf-8');
    const lines = data.split(/\r?\n/);
    let sum = 0;

    lines.forEach((line) => {
        const digits = line.match(/\d/g) || [];
        if (digits.length >= 2) {
            const number = parseInt(digits[0] + digits[digits.length - 1], 10);
            sum += number;
        }
    });

    return sum;
}

const filePath = './your_file.txt'; // Replace with your file path
const totalSum = parseAndSum(filePath);
console.log(`Total sum: ${totalSum}`);

