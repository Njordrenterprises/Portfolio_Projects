fn print_many(msg: &str, count: i32) {
    enum Mouse {
        LeftClick,
        RightClick,
        MiddleClick
    }

    let num: i32 = 15; 
    let a: char = 'a'; 
    let left_click: Mouse = Mouse::LeftClick;
}

//example using generics
//
let number: Vec<i32> = vec![1, 2, 3];//Vec<i32> is a type annotation
let letters: Vec<char> = vec!['a', 'b'];//charcter annotation
let clicks: Vec<Mouse> = vec! [//setting the Mouse Enum, (our own type)
    //remember that vec! is a MACRO
    Mouse::LeftClick,
    Mouse::LeftClick,
    Mouse::RightClick,
];
//-----> Some famous Generic types like Vec<T>
//Vec<T>: The versatile vector, for storing a growable list of values of the same type.

// Option<T>: Represents an optional value; either Some(T) if there is a value, or None if there is no value.

// Result<T, E>: Type for returning and propagating errors. It's an enum with variants Ok(T) for success and Err(E) for errors.

// Box<T>: A smart pointer for heap allocation. It points to data allocated on the heap.

// Rc<T>: The reference-counting smart pointer. Used for multiple ownership of data, where the data is cleaned up when the last owner goes out of scope.

// Arc<T>: Atomically reference-counted. Similar to Rc<T> but safe to use across threads.

// RefCell<T>: Enables mutable borrowing of an immutable value, but borrowing rules are enforced at runtime instead of compile time.

// Cell<T>: Similar to RefCell, but used for copying or moving its contents.

// HashMap<K, V>: A hash map that stores key-value pairs. Both keys and values can be any type.

// HashSet<T>: A collection of unique elements, implemented with a hash table.

// LinkedList<T>: A doubly-linked list. Less common due to its performance characteristics.

// BTreeMap<K, V>: A map based on a B-tree. It maintains sorted order of its entries.

// BTreeSet<T>: A set based on a B-tree, maintaining sorted order.

// Mutex<T>: Provides mutual exclusion for accessing the data it holds.

// RwLock<T>: A reader-writer lock that allows many readers or one writer at a time.

// Cow<'a, T>: The 'Copy on Write' smart pointer. It can enclose either a borrowed reference or an owned value.
