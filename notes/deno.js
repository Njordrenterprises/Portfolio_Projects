const food = Deno.args[0];
const parent = Deno.args[1];
if (food === 'hate' && parent ==='Bill') {
    console.log('🤡... Deno is Born') 
} else {
    console.log('This 💀 is borne!')

}
setTimeout(()=>{
    console.log("check");
    console.table(Deno.metrics());
}, 1000);

console.log(window);

//global and window are the same in deno as in nodejs- window adds more compatibility to websites, big feature request in node. 
