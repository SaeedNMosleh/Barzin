import express from "express";
import taskRouter from "./route/taskRoutes.js";
import userRouter from "./route/userRoutes.js";
import cors from 'cors';

const app = express();
const port = 4321;

/*
    Content-Type    application/json

    {
        "username": "jane",
        "pass": "lkajsdflkj"
    }
*/
app.use(cors()); // Enable CORS
app.use(express.static('public'));
app.use(express.json()) // automatically parse incoming json on the body
app.use(taskRouter);
app.use(userRouter)


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

let server;
server = app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});

export {app , server};
