
function start() {
    console.log("App started");
}

function init(){
    console.log("App initialized");
    start();
}

window.onload = init;// this waits for the DOM to be fully loaded before running init
//it waits until the html and css are fully loaded vefore running the init function
//parantheses after a function name on recall means run this now