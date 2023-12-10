
//Usually only use copy and clones derives on structs that have 5 or less items

#[derive(Debug, Clone, Copy)]//clone and copy informs the compiler
//it is automatically allowed to copy it. Ownership not transferred
//copy is made instead.  Resource wasteful.
//
//derive is a macro that derives from enums and structs
//allows you to automatically start some functionality. 
enum Position {
    Manager,
    Supervisor,
    Worker
}
#[derive(Debug, Clone, Copy)]
struct Employee {
    position: Position,
    work_hours: i64
}
//-------> REMEMBER - if you derive from different structs or enums
//then if you remove a derive and other are in it still, it wont work.
// basically cant be formatted using the debug token 
fn print_employee(emp: Employee) {
    println!("{:?})", emp);
}
fn main() {
    let me = Employee {
        position: Position::Worker,
        work_hours: 40
    };
    // match me.position {
    //     Position::Manager => println!("manager"),
    //     Position::Supervisor => print!("supervisor")
    //     Position::Worker => print!("worker"),
    // } this can all be deleted because its coming 
    // from derive Debug
    println!("{:?}", me.position);
    print_employee(me); //everytime you do this now will make 
    //a new copy...
}
