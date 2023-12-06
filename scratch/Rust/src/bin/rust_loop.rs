use std::collections::HashMap;

use regex::Regex;


const CALIBRATION_RAW: &str = include_str!("../calibration_raw.txt");

fn part1() { 
    let codes = CALIBRATION_RAW.split("\n")
        .map(|line| {
            let mut iter = line
                .chars()
                .filter(|char| char.is_numeric());
            if let Some(first) = iter.next() {
                if let Some(last) = iter.next_back() {
                    Ok(format!("{}{}", first, last))
                } else {
                    Ok(format!("{}{}", first, first))
                }
            } else {
                Err("there are no numbers".to_owned())
            }
        });
    let sum = codes.into_iter()
        .fold(0_u32, |a, b| {
            if let Ok(str) = b {
                if let Ok(num) = str.parse::<u32>() {
                    a + num
                } else {
                    a
                }
            } else {
                a
            }
        });
    println!("{}", sum);
}
fn part2 () {
    let word_to_num: HashMap<&str, u32> = [
        ("one", 1),
        ("two", 2),
        ("three", 3),
        ("four", 4),
        ("five", 5),
        ("six", 6),
        ("seven", 7),
        ("eight", 8),
        ("nine", 9)
    ].iter().cloned().collect();
    let str_to_num: HashMap<&str, u32> = [
        ("1", 1),
        ("2", 2),
        ("3", 3),
        ("4", 4),
        ("5", 5),
        ("6", 6),
        ("7", 7),
        ("8", 8),
        ("9", 9)
    ].iter().cloned(). collect();
    let rev_to_num : HashMap<&str, u32> = [
        ("eno", 1),
        ("owt", 2),
        ("eerht", 3),
        ("ruof", 4),
        ("evif", 5),
        ("xis", 6),
        ("neves", 7),
        ("thgie", 8),
        ("enin", 9)
    ].iter().cloned().collect();
    let re = Regex::new(r"one|two|three|four|five|six|seven|eight|nine|[1-9]").unwrap();
    let er = Regex::new(r"enin|thgie|neves|xis|evif|ruof|eerht|owt|eno|[1-9]").unwrap();
    let codes = CALIBRATION_RAW.split("\n")
        .map(|line| {
            let mut str_or_word_to_num = str_to_num.clone();
            str_or_word_to_num.extend(word_to_num.clone());
            let mut str_or_rev_to_num = str_to_num.clone();
            str_or_rev_to_num.extend(rev_to_num.clone());
            let enil: String = line.chars().rev().collect();
            if let Some(first) = re.find(line) {
                if let Some(last) = er.find(&enil) {
                    let last: &str = last.into();
                    Ok(
                        str_or_word_to_num.get(first.into()).ok_or("error 1".to_owned())? * 10
                            + str_or_rev_to_num.get(last.into()).ok_or("error 2".to_owned())?)
                } else {
                   Err("unknown".to_owned()) 
                }
            } else {
                Err("unknown".to_owned())
            }
        });
    let sum = codes.into_iter()
        .fold(0_u32, |a, b| {
            if let Ok(num) = b {
                a + num
            } else {
                a
            }
        });
    println!("{}", sum);
}
fn main() {
    part1();
    part2();
}
