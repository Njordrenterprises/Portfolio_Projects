import { path } from "./deps.ts";
import os from "node:os";

//change console colors 
console.log("%cImported", "color:red"); 

//logging with nodejs module 
console.log("Current architecture is:", os.arch());
console.log("Home directory is:", os.homedir());
