// example of vector data structure

let my_numbers = vec![1, 2, 3]; //using the vec macro is more convenient
//                              basically the same as below vector


let mut my_numbers2 = Vec::new();
my_numbers.push(1); //these
my_numbers.push(2); //create
my_numbers.push(3); //same as line 3
my_numbers.pop();//pops one off
my_numbers.len();// this is 2 after the pop

let two = my_numbers[1]; //grab the index 1 of my_numbers2

let my_numbers3 = vec![1, 2, 3]; //elements aka items aka collection

for num in my_numbers {      //for each number in my collection
    println!("{:?}", num);   //printline with the number. 

//use for in to iterate through items in a vector


  
