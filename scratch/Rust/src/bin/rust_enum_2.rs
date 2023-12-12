
//basic enum
enum Mouse {
    LeftClick,
    RightClick,
    MiddleClick,
    Sroll(i32),
    //you can associate additional data
    //by using a data type like this
    Move(i32, i32),//like x and y for a destructure
}

//more examples 

enum PromoDiscount {
    NewUser,
    Holiday(String),
}

enum Discount {
    Percent(f64),
    Flat(i32),
    Promo(PromoDiscount),//the data can also be another enum!!!
    Custom(string),
}
