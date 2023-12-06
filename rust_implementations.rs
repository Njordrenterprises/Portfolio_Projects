struct Temperature {
    degrees_f: f64,
}

//create implementation for freezing temps using Self
//defining freezing temperature here. 
impl Temperature {
    fn freezing() -> Self { //once this function is called
        //we return a new temperature set here. 
        Self {degrees_f: 32.0} 

    fn boiling() -> Self {
        Self{degrees_f: 212.0}
        }
       
    fn show_temp(&self) {
        println!("{:?} degrees F", self.degrees_f);
    }
}

fn main() {
    let hot = Temperature { degrees_f: 99.9};
    hot.show_temp();

    let cold = Temperature::freezing(); //use the two colons to define the 
    //implmenation block and call the function 
    cold.show_temp(); //call the show_temp function, self is implied
        //
    let boiling = Temperature::boiling();
    boiling.show_temp();
}
