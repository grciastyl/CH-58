function saveTask() {
    console.log("Save button clicked");

    //get the values from the form
    const title = $("#txtTitle").val();
    const description = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();
    console.log(title, description, color, date, status, budget);

    //build the task object
    let newTask = new Task(title, description, color, date, status, budget);
    console.log(newTask);

    //send the object to the server
    $.ajax({//ajax method to send a POST request to the server to save the task
        type: "POST",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(newTask), //takes the newTask object as a JSON string and saves it as the variable data
        contentType: "application/json", //specifies that the application is sending data in JSON format
        success: function (response) {
            console.log("Task saved successfully", response);
        },
        error: function (error) {
            console.log("Error saving task", error);
        }
    }
    )

    //display the task in the list section
    //displayTask(newTask);
}

function loadTasks() {
    //use the Get method to retrieve tasks from the server
    //the server name is http://fsdiapi.azurewebsites.net/api/tasks
    //let the variable data = JSON.parse(response); <-- parse the JSON response into a JavaScript object
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net/api/tasks",
        success: function (response) {
            let data = JSON.parse(response);// take the JSON response and set it to the variable data
            for (let i = 0; i < data.length; i++) {//start looping through the array of tasks
                let task = data[i];//set the current task to the current element in the array   
                if (task.name === "Chris58") {//if the task belongs to Chris58
                    displayTask(task);// display the task in the list section
                }
            }
                console.log("Task saved successfully", data);
            },
            error: function (error) {
                console.log("Error saving task", error);
            }
        }
)

}
//this is the homework
function displayTask(task) {
    let taskHtml = `<div class= "task" style="border-color: ${task.color}">
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    <p>Date: ${task.date}</p>
    <p>Status: ${task.status}</p>
    <p>Budget: ${task.budget}</p>`;
    $(".get-list").append(taskHtml);
}
function testConnection() {
    $.ajax(
        {
            type: "GET",
            url: "http://fsdiapi.azurewebsites.net",
            success: function (response) {
                console.log(response);
            },
            error: function (errorMsg) {
                console.log(errorMsg);
            }
        }
    )
}
function init() {
    console.log("App initialized");

    //load data
    loadTasks();

    //hook events --when someone clicks the save button-do something
    $("#btnSave").click(saveTask);

}

window.onload = init;// this waits for the DOM to be fully loaded before running init
//it waits until the html and css are fully loaded vefore running the init function
//parantheses after a function name on recall means run this now