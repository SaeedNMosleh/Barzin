# Notes
/// TO Do : Organize the notes

//  npm init -y
//      node --watch server.js
/*
    anonymous functions
        function() {}
            OR
        () => {}

    req.method      "GET"
    req.url         "/"

    app.get("/", (req, res) => {
        res.sendFile("./public/index.html")
    })

    app.patch("/task", (req, res) => {
    
    })
*/
/* Initial version with Node.js
import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
    switch (req.method){
        case "GET":
            switch (req.url){
                case "/":
                    // 1. read the file using fs
                    const html = fs.readFileSync("./public/index.html", "utf-8")
                    // 2. set header Content-Type to text/html
                    res.setHeader("Content-Type", "text/html")
                    // 3. res.write
                    res.write(html)
                    break;

                default:
            }
            break;
            
        default:

    }
    res.end()
})

server.listen(4321, () => {
    console.log("Now listening!")
})