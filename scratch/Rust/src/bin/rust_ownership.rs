// struct Book {
//     pages: i32,
//     rating: i32,
// }

// fn display_page_count(book: Book) {
//     println!("pages = {:?}", book.pages);
// }

// fn display_rating(book: Book) {
//     println!("rating = {:?}", book.rating);
// }

// fn main() {
//     let book = Book {
//         pages: 5,
//         rating: 9,
//     };

//     display_page_count(book);
//     display_rating(book);
// // }

//this program will error because ownership of book 
//has been dropped after being used. Rust only holds
//on to the memory of an ownership until it is done 
//being used.  To borrow instead of using the data in
//a variable, can use the & for each variable.  Then
//the data will be borrowed from the owner. 
//

   
struct Book {
    pages: i32,
    rating: i32,
}

fn display_page_count(book: &Book) {
    println!("pages = {:?}", book.pages);
}

fn display_rating(book: &Book) {
    println!("rating = {:?}", book.rating);
}

fn main() {
    let book = Book {
        pages: 5,
        rating: 9,
    };

    display_page_count(&book);
    display_rating(&book);
}

//this is the way
