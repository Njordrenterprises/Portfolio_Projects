


//     enum Option<T> { >----- Option contains some type
//         Some(T), >------- Placeholder for variance and 
//                          type specified for program
//         None
//     }


struct Customer {
    age: Option<i32>,
    email: String,
}

let mark = Customer {
    age: Some(22), email: "mark@example.com".to_owned(),
};

let mark = Customer {
    age: None, email: "becky@example.com".to_owned(),
};
match becky.age {
    Some(age) => println!("customer is {:?} years old", age),
    None => println!("customer age not provided"),
}

// example 2

struct GroceryItem {
    name: String,
    qty: i32, 
}

fn find_quantity(name: &str) -> Option<i32> {//returns an option if we find quantity
    let groceries = vec! [
        GroceryItem { name: "bananas".to_owned(), qty: 4, },
        GroceryItem { name: "eggs".to_owned(), qty: 12, },
        GroceryItem { name: "bread".to_owned(), qty: 1, },
];
    for item in groceries { //check for item as indicated by the name --item is a variable we set
        //here - basic for loop setup - for variable in variable
        if item.name == name { //if the name of the item is = to provide name (before string slice
                               //type)
        return Some(item.qty); //return in rust is an 'early return' 
                               //if not using an early return then have to go through each vector
                               //item
        }
    }
    None // this is a regular return
}
