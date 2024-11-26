import request  from "supertest";
import {app, server} from "../server";


describe("GET /api/tasks", () => {
    it("should rturn all the tasks", async () => {
        const res = await request(app)
            .get("/api/tasks")
            .expect("Content-Type", /json/)
            .expect(200);
    });
    afterAll(done => {
        // Close the server after all tests
        server.close(done);
    });
});