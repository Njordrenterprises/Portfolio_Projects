// data will always contain successful or error data
// used whenever an action has to be taken but has
// the possibility of failure.
// like copying a file or connecting to a website

enum Result<T, E> {
    Ok(T), 
    Err(E)
}

// another example

fn get_sound(name: &str) -> Result<SoundData, String> {
    if name == "alert" {
        OK(SoundData::new("alert")),
    } else {
        Err("unable to find sound data".to_owned())
    }
}

let sound = get_sound("alert");
match sound {
    Ok(_) => println!("sound data located");
    Err(e) => println!("Error: {:?}", e),
}
