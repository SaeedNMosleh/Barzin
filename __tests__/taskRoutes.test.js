import request  from "supertest";
import {app, server} from "../server";

//GET "api/tasks"
describe("GET /api/tasks", () => {
    it("should rturn all the tasks", async () => {
        const res = await request(app)
            .get("/api/tasks")
            .expect("Content-Type", /json/)
            .expect(200);
    });
});


// POST /api/task
describe("POST /api/task/:name/", () => {
    it("should return the message that task is save in DB",async ()=> {
        const createRes = await request(app)
            .post("/api/task/NEWTASK/NotStarted")            
            .expect("Content-Type", /text\/html/)
            .expect(200);
        expect(createRes.text).toBe("Tasks are saved!");

        const deleteRes = await request(app)
        .delete("/api/task/NEWTASK")
        .expect("Content-Type", /text\/html/)
        .expect(200);
        expect(deleteRes.text).toBe("Task: NEWTASK is deleted.")
    });
});

//GET /api/task/:name
// Note : A Test strategy and plan is needed.  
// task creation -> modification -> delete . 
// the created task can be used in modification and deletion
// to consider required steps and clean up steps in a single "it" as a multi steps test
describe("GET /api/task/task3",()=> {
    it("should return a JSON object with task name and status ", async()=> {
        const res = await request(app)
            .get("/api/task/task3")
            .expect("Content-Type", /json/)
            .expect(200);
        
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("status");
    });
});

afterAll(done => {
    // Close the server after all tests
    server.close(done);
});






