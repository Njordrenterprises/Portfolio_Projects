import re

def convert_spelled_number(word):
    number_map = {
        "zero": "0", "one": "1", "two": "2", "three": "3", "four": "4",
        "five": "5", "six": "6", "seven": "7", "eight": "8", "nine": "9"
    }
    return number_map.get(word.lower(), "")

def get_calibration_value(line):
    # Replace spelled out numbers with digits
    line = re.sub(r'\b(zero|one|two|three|four|five|six|seven|eight|nine)\b', lambda match: convert_spelled_number(match.group()), line, flags=re.IGNORECASE)

    # Find all digits in the line
    digits = re.findall(r'\d', line)

    if not digits:
        return 0  # No digits found

    # Use the first and last digit, or the same digit twice if there's only one
    first_digit = digits[0]
    last_digit = digits[-1] if len(digits) > 1 else first_digit

    return int(first_digit + last_digit)

def process_file(file_path):
    total_sum = 0
    with open(file_path, 'r') as file:
        for line in file:
            total_sum += get_calibration_value(line.strip())

    return total_sum

# Example usage
file_path = 'input.txt'
print(f"The sum of all calibration values is: {process_file(file_path)}")

