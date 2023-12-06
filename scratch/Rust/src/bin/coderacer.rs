use std::io;
use std::time::{Duration, Instant};
use std::sync::mpsc;
use std::thread;

fn main() {
    loop {
        println!("Paste the code block you want to practice, then type 'END' on a new line and press Enter:");
        let mut code_block = String::new();
        loop {
            let mut line = String::new();
            io::stdin().read_line(&mut line).expect("Failed to read line");
            if line.trim() == "END" {
                break;
            }
            code_block.push_str(&line);
        }

        println!("Enter your time limit in seconds:");
        let mut time_limit = String::new();
        io::stdin().read_line(&mut time_limit).expect("Failed to read time limit");
        let time_limit: u64 = time_limit.trim().parse().expect("Please enter a valid number");

        start_practice(&code_block, time_limit);

        println!("Would you like to try again? (yes/no)");
        let mut try_again = String::new();
        io::stdin().read_line(&mut try_again).expect("Failed to read input");

        if try_again.trim().eq_ignore_ascii_case("no") {
            break; // Exit the loop, thus ending the program
        }
    }
}

fn start_practice(code_block: &str, time_limit: u64) {
    let (tx, rx) = mpsc::channel();
    let tx_clone = tx.clone();

    let input_thread = thread::spawn(move || {
        println!("Start typing the code block. You have {} seconds. Use backspace for corrections.", time_limit);
        let mut user_input = String::new();
        loop {
            let mut buffer = [0; 1]; // Read one byte at a time to handle backspace
            match io::stdin().read_exact(&mut buffer) {
                Ok(_) => {
                    let char = buffer[0] as char;
                    if char == '\u{8}' { // Backspace character
                        user_input.pop(); // Remove the last character
                    } else {
                        user_input.push(char);
                    }
                },
                Err(e) => {
                    println!("Error reading input: {}", e);
                    break;
                },
            }
            if let Err(_) = tx_clone.send(user_input.clone()) {
                break; // Stop if we can't send (receiver has dropped)
            }
        }
    });

    let timer = Instant::now();
    let mut last_user_input = String::new();
    while timer.elapsed() < Duration::from_secs(time_limit) {
        if let Ok(user_input) = rx.try_recv() {
            last_user_input = user_input;
        }
    }

    evaluate_proficiency(code_block, &last_user_input);

    let _ = input_thread.join();
}


fn evaluate_proficiency(original: &str, user_input: &str) {
    let original_no_newlines = original.trim().replace("\r\n", "").replace("\n", "");
    let user_input_no_newlines = user_input.trim().replace("\r\n", "").replace("\n", "");

    // Calculate how many times the original code block appears in the user input
    let repetitions = user_input_no_newlines.matches(&original_no_newlines).count();

    // Calculate total length of correct repetitions
    let correct_length = repetitions * original_no_newlines.len();

    // Calculate accuracy and speed
    let accuracy = if user_input_no_newlines.len() > 0 {
        (correct_length as f64 / user_input_no_newlines.len() as f64) * 100.0
    } else {
        0.0
    };

    let speed = repetitions as f64; // Number of correct repetitions

    println!("Accuracy: {:.2}%", accuracy);
    println!("Speed: {:.2} repetitions per minute", speed);
}

