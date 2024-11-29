
const buttonTasks = document.getElementById("queryAllTasks");

buttonTasks.addEventListener("click", async ()=>{
    const tasks = await getAllTasks();
    displayTasks(tasks);
});

async function getAllTasks(){
    const url = "http://localhost:4321/api/tasks";
    const json = await fetch(url,{method : 'GET'}); //Default Method : GET , can be skipped 
    const response = await json.json();
    return response;
}

function displayTasks(tasks) {
    const allTasksElement = document.getElementById("allTasks");
    allTasksElement.innerHTML = ''; // Clear previous tasks
    tasks.forEach(task => {
        const taskElement = document.createElement("p");
        taskElement.textContent = `Name: ${task.name}, Status: ${task.status}`;
        allTasksElement.appendChild(taskElement);
    })};