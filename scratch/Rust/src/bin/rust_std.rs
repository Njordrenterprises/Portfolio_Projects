// use 'rustup doc' in terminal to look up documentation
// for vector macro we find is_empty for this example

fn main() {
    let numbers = vec![1, 2, 3];
    match numbers.is_empty() {
        true => println!("no numbers");
        false => println!("has numbers");
    }
}
