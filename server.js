//  npm init -y
//      node --watch server.js
/*
    anonymous functions
        function() {}
            OR
        () => {}

    req.method      "GET"
    req.url         "/"

    app.get("/", (req, res) => {
        res.sendFile("./public/index.html")
    })

    app.patch("/task", (req, res) => {
    
    })
*/
/* Initial version with Node.js
import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
    switch (req.method){
        case "GET":
            switch (req.url){
                case "/":
                    // 1. read the file using fs
                    const html = fs.readFileSync("./public/index.html", "utf-8")
                    // 2. set header Content-Type to text/html
                    res.setHeader("Content-Type", "text/html")
                    // 3. res.write
                    res.write(html)
                    break; 

                default:
            }
            break;
            
        default:

    }
    res.end()
})

server.listen(4321, () => {
    console.log("Now listening!")
})
*/

// Express version
import express from "express";
import path from "path";
import fs, { read } from "fs";

const app = express();
const port = 4321;

const validStatus = ['NotStarted', 'Ongoing', 'Completed'];

app.use(express.static('public'));  

/*
    GET "/api/tasks"
    This endpoint will return all the tasks

*/

app.get('/api/tasks', (req, res) => {
    res.json(readTasks())
});
/////////////////////////
/*
    GET "/api/task/:name"
    get a single task
*/

app.get('/api/task/:name', (req, res) => {
    const tasks = readTasks();
    const task = tasks.find(task => task.name === req.params.name);
    if (task){
        res.json(task);
    } else {
        res.status(404);
        res.send("Task not found");
    }
});
//////////////////////
/*
    POST "/api/task"
    This endpoint is for creating a task
*/
app.post('/api/task/:name/:status', (req, res) => {
    // If task or status missing, return 400 -> In case of missing parameters route is not chosen. 
     // if status is not a valid status, return 400
    const statusCheck = validStatus.find(status => status === req.params.status);
    if (!statusCheck){
        return res.status(400).send("Invalid Status!");
    }
    // read our tasks
    const tasks = readTasks()
    // If task already exists, return 400
    const taskCheck = tasks.find(task => task.name === req.params.name);
    if (taskCheck){
        return res.status(400).send("The task name is already existed!");
    }

    // create a new task and push to the array
    tasks.push({
        name: req.params.name,
        status: req.params.status
    });

    // save tasks
    saveTasks(tasks);
    res.send("Tasks are saved!");
});
//////////////////////////
/*
    PATCH "/api/task/name/:oldName/:newName"
    Editing a task name    
*/
app.patch('/api/task/:name/:newName',(req,res) =>{
    const tasks = readTasks();
    // Checking existance of task and return index
    const taskIndex = tasks.findIndex(task => task.name === req.params.name);
    if (taskIndex !== -1){
        tasks[taskIndex].name = req.params.newName;
        saveTasks(tasks);
        res.send("Task name is editted");
    } else {
        res.status(404);
        res.send("Task not found");
    }
});

/////////////////////////
/*
    PATCH "/api/task/status/:name/:newStatus"
    Edit task status
*/
app.patch('/api/task/status/:name/:newStatus',(req,res)=>{
    const tasks = readTasks();
    // Checking existance of task and return index
    const taskIndex = tasks.findIndex(task => task.name === req.params.name);
    if (taskIndex !== -1){
        tasks[taskIndex].status = req.params.newStatus;
        saveTasks(tasks);
        res.send(`Status of task: ${tasks[taskIndex].name} is changed to : ${tasks[taskIndex].status}`);
    } else {
        res.status(404);
        res.send("Task not found");
    }
});

/////////////////////////
/*

    DELETE "/api/task"
    deleting a task

*/
app.delete('/api/task/:name',(req,res)=>{
    const tasks = readTasks();
    // Checking existance of task and return index
    const taskIndex = tasks.findIndex(task => task.name === req.params.name);
    if (taskIndex !== -1){
        tasks.splice(taskIndex,1);
        saveTasks(tasks);
        res.send(`Task: ${req.params.name} is deleted.`);
    } else {
        res.status(404);
        res.send("Task not found");
    }
});

/////////////
// Thunder Client -> Extension for API Call

/*
    Sending data along with a request
        1. search parameters
            /api/task?name=walk the dog&status=incomplete
            req.query
        2. url parameters
            "/api/task/:name/:status"
            /api/task/walk the dog/incomplete
            req.params.name
            req.params.status
        3. request body
            Headers     Content-Type = application/json
            Body        {
                            "name": "Walk the dog",
                            "status": "incomplete"
                        }
            req.body    (you must have the express.json() middeware)
*/

// app.use = all methods GET, POST, PUT, etc..
app.use("*", (req, res) => { //* -> others 
    res.status(404)
    res.send("Not found")
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})


function readTasks(){
    const json = fs.readFileSync("./tasks.json", "utf-8");
    const tasks = JSON.parse(json);
    return tasks;
}

function saveTasks(tasks){
    const tasksObjects = JSON.stringify(tasks);
    fs.writeFileSync("./tasks.json",tasksObjects);
}