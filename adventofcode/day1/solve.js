"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function parseAndSum(filePath) {
    var data = (0, fs_1.readFileSync)(filePath, 'utf-8');
    var lines = data.split(/\r?\n/);
    var sum = 0;
    lines.forEach(function (line) {
        var digits = line.match(/\d/g) || [];
        if (digits.length >= 1) {
            // If only one digit, use it twice. Otherwise, use first and last.
            var firstDigit = digits[0];
            var lastDigit = digits.length > 1 ? digits[digits.length - 1] : firstDigit;
            var number = parseInt(firstDigit + lastDigit, 10);
            sum += number;
        }
    });
    return sum;
}
var filePath = './input.txt'; // Replace with your actual file path
var totalSum = parseAndSum(filePath);
console.log("Total sum: ".concat(totalSum));
