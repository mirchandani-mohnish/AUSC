const router = require("express").Router();
const Todo = require("../models/Todo");
const express = require('express');

const jwt = require('jsonwebtoken');
const cookieparsar = require('cookie-parser');
router.use(cookieparsar());
// routes

//const Todo = require("../models/Todo");

// routes will be here....
router.use(express.json());
router.use(express.urlencoded({
    extended: true
  }));


router.get("/", async(req, res) => {
  let accessToken = req.cookies.mcook
    if (!accessToken){
        return res.status(403).send()
    }
    let payload
    try{
        
        payload = jwt.verify(accessToken, "bcozimbatman");
        const allTodo = await Todo.find({username: payload.username});
        res.render("todo/index", {todo: allTodo})
        
        
    }
    catch(e){
        //if an error occured return request unauthorized error
        
      console.log(e);
      res.send("please sign in again");

    
        
    }
    
});


router
  .post("/add/todo", (req, res) => {
    const { todo } = req.body;
    

    let accessToken = req.cookies.mcook
    if (!accessToken){
        return res.status(403).send()
    }
    let payload
    try{
        
        payload = jwt.verify(accessToken, "bcozimbatman");
        
        
        const newTodo = new Todo({ todo , username:payload.username});
        newTodo
        .save()
        .then(() => {
          console.log("Successfully added todo!");
          res.redirect("/todo");
        })
        .catch((err) => console.log(err));
    }
    catch(e){
        //if an error occured return request unauthorized error
        
      console.log(e);
      res.send("please sign in again");

    
        
    }
    
    

    // save the todo
    
  })

  .get("/delete/todo/:_id", (req, res) => {
    const { _id } = req.params;
    Todo.deleteOne({ _id })
      .then(() => {
        console.log("Deleted Todo Successfully!");
        res.redirect("/todo");
      })
      .catch((err) => console.log(err));
  });

module.exports = router;