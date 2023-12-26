struct Survey {
    q1: Option<i32>,
    q2: Option<bool>,
    q3: Option<String>,
}

fn main () {
    let response = Survey {
        q1: Some(12),
        q2: None, //setting no data
        q3: Some("A".to_owned())
    };

    match response.q1 {
        Some(ans) = println!("q1: {:?}", ans),//ans is just the answer variable here
        None => println!("q1: no response"),//it will return 12 from q1
    }
    match response.q2 {//as there was no response data, it will go to next match
        Some(ans) = println!("q2: {:?}", ans),
        None => println!("q2: no response"),
    }
    match response.q3 {
        Some(ans) = println!("q3: {:?}", ans),
        None => println!("q3: no response"),
    }
}
