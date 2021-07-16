const router = require("express").Router();
const Todo = require("../models/Todo");
const express = require('express');


// routes

//const Todo = require("../models/Todo");

// routes will be here....
router.use(express.json());
router.use(express.urlencoded({
    extended: true
  }));


router.get("/", async(req, res) => {
    const allTodo = await Todo.find();
    res.render("todo/index", {todo: allTodo})
})


router
  .post("/add/todo", (req, res) => {
    const { todo } = req.body;
    const newTodo = new Todo({ todo });

    // save the todo
    newTodo
      .save()
      .then(() => {
        console.log("Successfully added todo!");
        res.redirect("/todo");
      })
      .catch((err) => console.log(err));
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
