
fn main() {
let my_num = 3;
let is_lt_5 = if my_num < 5 { //setting is_lt_5 to an expression my_num < 5
    true
} else {
    false
};

let is_lt_5 = my_num < 5;

}

//match expression
//
let my_num = 3: 
let message = match my_num {
    1 => "hello",
    _ => "goodbye"
};

//nested expressions
enum Menu {
    Burger,
    Fries,
    Drink,
}

let paid = true; 
let item = Menu::Drink;
let drink_type = "water";
let order_place = match item {
    Menu::Drink => {
        if drink_type == "water" {
            true
        } else {
            false
        }
    }
    _ => true,
};

//best to only use 2 to 3 levels of nesting
//
enum Access {
    Admin,
    Manager,
    User,
    Guest
}
fn main() {
    //secret file: admins only
    let access_level = Access::Guest;
    let can_access_file = match access_level {
    Access:: Admin => true,
    _ => false, 
};
    println!("Can access: {:?}, can_access_file");
}
