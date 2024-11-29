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

### Expect functions for API testing

### Expect functions for API testing

| Description | Input Format | Expected Output |
|-------------|--------------|-----------------|
| `expect(response.status).toBe()` | number (e.g., 200) | Passes if the status code matches. |
| `expect(response.body).toBe()` | any (e.g., object, string) | Passes if the body matches. |
| `expect(response.body).toEqual()` | any (e.g., object, array) | Passes if the body deeply equals. |
| `expect(response.body).toHaveProperty()` | string (e.g., "name") | Passes if the property exists. |
| `expect(response.body).toBeInstanceOf()` | class (e.g., Array) | Passes if the body is an instance. |
| `expect(response.body).toContain()` | any (e.g., string, object) | Passes if the item is found. |
| `expect(response.body.length).toBeGreaterThan()` | number (e.g., 0) | Passes if the length is greater. |
| `expect(response.headers['content-type']).toMatch()` | regex (e.g., /json/) | Passes if the header matches. |
| `expect(response.body).toMatchObject()` | object (e.g., { name: "test" }) | Passes if the subset matches. |
| `expect(response.body).not.toBe()` | any (e.g., object, string) | Passes if the body does not match. |
| `expect(response.body).toBeDefined()` | none | Passes if the body is not undefined. |
| `expect(response.body).toBeNull()` | none | Passes if the body is null. |
| `expect(response.body).toBeTruthy()` | none | Passes if the body is truthy. |
| `expect(response.body).toBeFalsy()` | none | Passes if the body is falsy. |
| `expect(response.body).toBeGreaterThanOrEqual()` | number | Passes if the body is greater than or equal to the number. |
| `expect(response.body).toBeLessThan()` | number | Passes if the body is less than the number. |
| `expect(response.body).toBeLessThanOrEqual()` | number | Passes if the body is less than or equal to the number. |
| `expect(response.body).toContainEqual()` | any (e.g., object) | Passes if the array contains an element that is equal to the provided value. |
| `expect(response.body).toMatchSnapshot()` | none | Passes if the body matches the snapshot. |
| `expect(response.body).toThrow()` | none | Passes if the function throws an error. |
| `expect(response.body).toThrowError()` | error (e.g., Error) | Passes if the function throws the specified error. |

## Testing by making a prototype for Frontend
It can be done by using the fetch API in JavaScript to make requests to the API.

 