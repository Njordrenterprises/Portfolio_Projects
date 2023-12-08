fn print_it(data: &str) {  //setting the string slice to borrowed data
    printlnt!("{:?}", data);
}

fn main() {
    print_it("a string slice"); //borrowed already as described in line 1
    let owned_string = "owned string".to_owned();
    let another_owned = String::from("another");
    print_it(&owned_string); //borrowing from let lin 7
    print_it(&another_owned);// borrwoing from let lin 8
}

// can't place borrowed data inside a structure <--------------
// 
// struct Employee {
// name: &str,
// }
//
// fn main () {
//  let emp_name = "Bill";
//  let emp + Employee {
//      name: emp_name
//  };
// }
//-------------------------------------------------------------


// this way!!<---------

struct Employee {
    name: string,
} 

fn main () {
    let emp_name = "Bill".to_owned(); //or
    let emp_name = String::from("Bill")
        
    let emp = Employee {
        name: emp_name
    };
}

// Strings are automatically borrowed
// Use .to_owned() or String::from() to create 
// an owned copy of a string slice
// Use an owend String when storing in a struct
