# Create WebServer

## Built-in  Library Node.js

Ref : <https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener>

### Create a server

```javascript
import http from 'http'
const server = http.createServer((req,res) => {...});
```

### Setup a port

```javascript
server.listen(3000, () => ){
    console.log('listening on port 3000);
}
```

### Types of Request

| Method  | Description                                                        |
|---------|--------------------------------------------------------------------|
| GET     | Requests data from a specified resource.                           |
| POST    | Submits data to be processed to a specified resource.              |
| PUT     | Updates a current resource with new data.                          |
| DELETE  | Deletes the specified resource.                                    |
| HEAD    | Same as GET but returns only HTTP headers and no document body.    |
| OPTIONS | Returns the HTTP methods that the server supports for a specified URL. |
| PATCH   | Applies partial modifications to a resource.                       |

## Create WebServer by Express.js

`npm install express`

`npx express-generator` : Quickly create an application skeleton.

```javascript
import express from "express";
import path from "path";

const app = express();
const port = 4321;

app.use(express.static('public'));  

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```
