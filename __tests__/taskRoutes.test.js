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

//GET /api/task/:name
// Note : A Test strategy and plan is needed.  
// task creation -> modification -> delete . 
// the created task can be used in modification and deletion
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



// POST /api/task


