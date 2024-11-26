# Testing API

## Testing API by Thunder client
It's an extension for VS Code that allows you to test APIs. 
The type of requests you can make are: Get, Post, Put, Patch, Delete, and Options.

## Testing by curl command

```bash
curl http://localhost:4321/api/tasks
```

## Testing APIs by Supertest and Jest

Ref : https://blog.dennisokeeffe.com/blog/2023-10-27-testing-express-apps-with-jest-and-supertest
https://github.com/ladjs/supertest
https://jestjs.io/docs/getting-started

Supertest is a library that allows you to test APIs. Jest is a testing framework that allows you to test JavaScript code.

```js
npm install --save-dev jest supertest
```
- Create a new file : `__tests__/app.test.js`
- Add the following code to the file:

```js
const request = require("supertest");
const app = require("./app");

describe("GET /greet", () => {
    it("should greet the world when no name is provided", async () => {
        const res = await request(app)
            .get("/greet")
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body.message).toBe("Hello, World!");
    });

    it("should greet the user when a name is provided", async () => {
        const res = await request(app)
            .get("/greet?name=John")
            .expect("Content-Type", /json/)
            .expect(200);

        expect(res.body.message).toBe("Hello, John!");
    });
});
```