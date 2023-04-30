//const express= require("express");
import express from 'express';
import path from 'path';
const app = express();
import mongoose from "mongoose";


mongoose.connect("mongodb://127.0.0.1:27017",{
    dbName : "contact_database",
})
.then(()=> console.log("Dtabase conceted"))
.catch((e)=> console.log(e))

const messageSchema = new mongoose.Schema({
    name : String,
    email: String,
    msg : String,
});

const Messge = mongoose.model("Message",messageSchema)


//static file serving using middleware.
app.use(express.static(path.join(path.resolve(),'public')));

//After sumit form This 'post' midleware is activate on repetive url.
app.use(express.urlencoded({ extended: true }));

// setting up Views engine.
app.set("view engine","ejs");

// it render the index.ejs file.
app.get("/",(req,res)=>{
    res.render('index');
    //res.render('index.ejs');

});

app.get("/success",(req,res)=>{
    res.render('success');
    //res.render('success.ejs');

});


app.post("/contact",async (req,res)=>{
    const userData = {name : req.body.name ,email:req.body.email,msg:req.body.msg}
    console.log(userData);
    // console.log(req.body.name);
    // console.log(req.body.email);
    // users.push({username : req.body.name,email:req.body.email});
    await Messge.create(userData);
    res.redirect('/success');
});

// app.get('/users',(req,res)=>{
//     res.json({
//         userData,
//     })
// })

app.listen(3000,()=>{
    console.log("App is listening on port no 3000");
});


















// creating server with routing of pages

//const http = require("http");
// import http from 'http';

// const server = http.createServer((req,res)=>{
//     if(req.url === '/'){
//         console.log(req.url);
//         res.end("<h1> Home page </h1>");

//     }
//     else if(req.url === '/about'){
//         console.log(req.url);
//         res.end("<h1> About page </h1>");

//     }

//     if(req.url === '/contact'){
//         console.log(req.url);
//         res.end("<h1> contact page </h1>");

//     }

//     else if(req.url === '/login'){
//         console.log(req.url);
//         res.end("<h1> Login page </h1>");

//     }
// });

// server.listen(3000,()=>{
//     console.log("Server is listen on port no 3000");

// });



// Creating Server :

// import express from 'express';

// const server = express();

// server.listen(3000,()=>{
//     console.log("Server is listen on port no 88000");

// });
