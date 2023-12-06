// enum Access {
//     Full,
// }

// fn one_two_three() -> (i32, i32, i32) { //returning 3 values into a tuple
//     //tuples are sorrounded in parentheses
//     (1, 2, 3)
// }

// let numbers = one_two_three();
// let (x, y, z) = one_two_three();
// println!("{:?}, {:?}", x, numbers.0); //1
// println!("{:?}, {:?}", x, numbers.1); //2
// println!("{:?}, {:?}", x, numbers.2); //3

// let (employee, access) = ("Jake", Access::Full);

// fn main (){

// }
//
fn main () {
    //use a tuple using a single variable name
    let coord = (2, 3);
    println!("{:?}, {:?}", coord.0, coord.1);

    let (x, y) = (2, 3);
    println!("{:?}, {:?}", x, y); 

    let (name, age) = ("Emma", 20);

    let favorites = ("red", 14, "TX", "pizza", "TVSHOW", "home"); //dont do this
    let state = favorites.2;//or this
    let place = favorites.5;//or this
    //Tuples tend to stay no more then 3 fields
    //More then 3 create a struct 
}
