enum Discount {
    Percent(i32),
    Flat(i32),
}

struct Ticket {
    event: String,
    price: i32,
}

fn main() {
    let n = 3;
    match n {
        3 => println!("three"),
        other => println!("number: {:?}", other), //instead
        //of using '_' can use a name like other or something
        //else.  SideNote: everything in a match is called 
        //a match arm. 
    }

    let flat = Discount::Flat(2); //this is a variable with extra
    //                              data from the enum
    match flat {
        Discount::Flat(2) => println!("flat 2"),
        Discount::Flat(amount) => println!("flat discount of {:?}", amount),
        _ => (), //can use parentheses to say I'm returning nothing
    }

    let concert = Ticket {
        event: "concert".to_owned(),//copying the Ticket Struct 
        //                          with to_owned
        price: 50,
    };
    match concert {
      Ticket {price: 50, event } => println!("price @ 50 = {:?}", event),
      Ticket {price, ..} => println!("price = {:?}", price),
            //the two '..' means anything else
        //  the {} tell rust we are matchin on a struct
    }
}
