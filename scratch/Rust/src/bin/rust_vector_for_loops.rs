struct Test {
    score: i32
}
fn main() {
    let my_scores = vec![
        Test { score: 90 }
        Test { score: 88 }
        Test { score: 77 }
        Test { score: 93 }
    ];

    for test in my_score {
        println!("score = {:?}", test.score);
    }
}
