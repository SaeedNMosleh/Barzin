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
import fs from "fs";

const app = express();
const port = 4321;

app.use(express.static('public'));  

app.get('/api/tasks', (req, res) => {
    // res.sendFile(path.join(__dirname, 'public', 'index.html'));
    res.json(readTasks())
});

try {
    const x = 1
    x++
} catch (error) {
    console.log(error.message)    
}


app.post('/api/task/:name/:status', (req, res) => {
    
    // If task already exists, return 400
    // if status is not a valid status, return 400
    // If task or status missing, return 400

    // read our tasks
    const tasks = readTasks("./tasks.json");

    // create a new task and push to the array
    tasks.push({
        name: req.params.name,
        status: req.params.status
    });

    // save tasks
    saveTasks(tasks);
    res.send("Tasks are saved!");
});

// Thunder Client

/*
    GET "/api/tasks"
    This endpoint will return all the tasks

    GET "/api/task/:name"
    get a single task

    POST "/api/task"
    This endpoint is for creating a task

    PATCH "/api/task/name/:oldName/:newName"
    Editing a task name

    PATCH "/api/task/status/:name/:newStatus"
    Edit task status

    DELETE "/api/task"
    deleting a task

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
  console.log(`Example app listening on port ${port}`)
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