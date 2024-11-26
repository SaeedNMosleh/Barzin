import { Router } from "express";
import fs from "fs";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

/*
    when signing up
        1. encrypt the password
            npm install bcrypt
            import { hashSync, compareSync } from 'bcrypt'
            hashSync("abcde", 6)    ->  "alsökhf103984uqöwfaslkdflaksj"
        2. return a token
            npm install jsonwebtoken
            import jwt from "jsonwebtoken"
            jwt.sign({ username: "doug "}, "SECRET-CODE", { expiresIn: "2w" })  --> "lkasdf8731u4j1ö3o4iruaösdfökalsrö7q28o345hjk3h"
                        payload                 secret          options

    when logging in?
        1. do they have a token?
        2. is it a valid token?
            jwt.verify("lkasdf8731u4j1ö3o4iruaösdfökalsrö7q28o345hjk3h", "SECRET-CODE")   ->  { username: "doug "}
            compareSync("abcde", "alsökhf103984uqöwfaslkdflaksj")   -> true

*/

const userRouter = Router();


// GET /api/user/all        -> all the users
userRouter.get('/api/user/all', (req,res) => {
    const users = readUsers();
    res.json(users);
});

// POST /api/user           -> create a new user
userRouter.post('/api/user',(req,res)=> {
    const hashCode = hashSync(req.body.pass, 6);
    const newUser = {
        userName: req.body.userName,
        pass: hashCode 
    }
    const token = jwt.sign(newUser,"123123123",{expiresIn: "2w"});
    
    const users = readUsers()
    users.push(newUser)
    saveUsers(users)

    res.send(token)
});


function readUsers(){
    const json = fs.readFileSync("./users.json", "utf-8");
    const users = JSON.parse(json);
    return users;
}


function saveUsers(users){
    const usersObjects = JSON.stringify(users);
    fs.writeFileSync("./users.json",usersObjects);
}

export default userRouter