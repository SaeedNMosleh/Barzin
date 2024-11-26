import { Router } from "express";
import fs from "fs";

const taskRouter = Router()

const validStatus = ['NotStarted', 'Ongoing', 'Completed'];

/*
    GET "/api/tasks"
    This endpoint will return all the tasks

*/

taskRouter.get('/api/tasks', (req, res) => {
    res.json(readTasks())
});
/////////////////////////
/*
    GET "/api/task/:name"
    get a single task
*/

taskRouter.get('/api/task/:name', (req, res) => {
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
taskRouter.post('/api/task/:name/:status', (req, res) => {
    // If task or status missing, return 400 -> In case of missing parameters route is not chosen. 
     // if status is not a valid status, return 400
    // const statusCheck = validStatus.find(status => status === req.params.status);
    const statusCheck = validStatus.includes(req.params.status);
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
taskRouter.patch('/api/task/:name/:newName',(req,res) =>{
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
taskRouter.patch('/api/task/status/:name/:newStatus',(req,res)=>{
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
taskRouter.delete('/api/task/:name',(req,res)=>{
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

function readTasks(){
    const json = fs.readFileSync("./tasks.json", "utf-8");
    const tasks = JSON.parse(json);
    return tasks;
}


function saveTasks(tasks){
    const tasksObjects = JSON.stringify(tasks);
    fs.writeFileSync("./tasks.json",tasksObjects);
}

export default taskRouter;