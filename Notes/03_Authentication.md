# Authnetication

## Procedure to implement token based authentication
### Sign-up a new user 
- POST api/auth
- Create hashcode based on passed Password (bcrypt library)
- Create a object {usrname, hashcode}
- Create a Token (jwt library)
- Save newuser

Additioal checks

- Minumum requirement check for username , password
- Duplication check

Considerations

- DB should be cleaned-up after expiry of tokens
- Periodic validy check of tokens shoudl be done

#### code snippet
##### Sign up
```js
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
```
##### Login
```js
userRouter.post('/api/user/login',(req, res)=>{    
    const decoded = jwt.verify(req.body.token , secretCode, (err, decoded)=>{
        return res.status(401).send("Invalid Token");
    });
    const user = readUsers().find(user => user.userName === decoded.userName);
    if(!user){
        return res.status(401).send("User not found");
    }
    const hashCode = user.pass;
    if(decoded.pass === hashCode){
        return res.send("logged in");
    }
    else{
        return res.status(401).send("Invalid token");
    }

});
```

