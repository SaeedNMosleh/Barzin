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
const secretCode = "123123123";


// GET /api/user/all        -> all the users
userRouter.get('/api/user/all', (req,res) => {
    const users = readUsers();
    res.json(users);
});

// POST /api/user           -> create a new user
userRouter.post('/api/user',(req,res)=> {
    //TODO : Add validator.js  -> https://github.com/validatorjs/validator.js
    // Alternative : express-validator : a middleware wraps validators offered by validator.js
    const hashCode = hashSync(req.body.pass, 6);
    const newUser = {
        userName: req.body.userName,
        pass: hashCode 
    }
    const token = jwt.sign(newUser, secretCode ,{expiresIn: "2w"});
    
    const users = readUsers()
    users.push(newUser)
    saveUsers(users)

    res.send(token)
});

//POST /api/user/login -> login user
// If token expires , DB should be clean-up to remove correspondent user names
userRouter.post('/api/user/login',(req, res)=>{
    
    const decoded = jwt.verify(req.body.token , secretCode, (err, decoded)=>{
        return res.status(401).send("Invalid Token");
    });
    const user = readUsers().find(user => user.userName === decoded.userName);
    if(!user){
        return res.status(401).send("User not found");
    }
    const hashCode = user.pass;
    //const userCheck = compareSync(decoded.pass,hashCode); 
    // It compares hashcode with initial string 
    //We can save the pass in user creation to be used here for reference but then generating hashcode doesn't make sense
     
    if(decoded.pass === hashCode){
        return res.send("logged in");
    }
    else{
        return res.status(401).send("Invalid token");
    }

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