//demo 1

// fn main () {
// struct ShippingBox {
//     depth: i32,
//     width: i32,
//     height: i32,//struct fields.  can access with dot (.)
// }

// let my_box = ShippingBox {
//     depth: 3,
//     width: 2,
//     height: 5, //must match the struct fields called in entirety
// };
//     let tall = my_box.height;
//     println!("the box is {:?} units tall", tall);
// }


struct GroceryItem {
    stock: i32, //field
    price: f64, //f64 used for decimal points
}

fn main() {
    let cereal = GroceryItem {
        stock: 10,
        price: 2.99,
    }; //always end let expressions with semi-colon
    println!("stock: {:?}", cereal.stock);
    println!("stock: {:?}", cereal.price);
    
}
