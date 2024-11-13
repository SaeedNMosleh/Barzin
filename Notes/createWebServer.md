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


