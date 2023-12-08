struct LineItem {
    name: String, //requires an owned string
    count: i32,
}

fn print_name(name: &str) {
    println!("name: {:?}", name)
}
fn main () {
    let reciept = vec![
        Line Item {
            name:"cereal".to_owned(),//use this<------
            count: 1,
        },
        Line Item {
            name: String::from("fruit"),//or this<-----
            count: 3,
        },
    ];

    for item in reciept {
        print_name(item.name);
        println!("count: {:?}", item.count);
    }
}
