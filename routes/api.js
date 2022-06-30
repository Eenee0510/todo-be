const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");
const Todo = require("../models/Todo");

router.get("/todo", (req, res) => {
  Todo.find({}, function (err, data) {
    if (err) next;
    res.json(data);
  });
});

router.delete("/todo/:id", (req, res) => {
  console.log(req.params.id);
  Todo.findOneAndRemove({ _id: req.params.id }, function (err, data) {
    if (err) next;
    // res.json(data);
    res.send("deleted");
  });
});

router.put("/todo", (req, res) => {
  const reqBody = req.body;
  Todo.findByIdAndUpdate(
    reqBody._id,
    {
      todo: reqBody.todo,
    },
    function (err, data) {
      if (err) next;
      // res.json(data);
      res.send("updated");
    }
  );
});

router.post("/todo", (req, res) => {
  const reqBody = req.body;
  let newTodo = new Todo({
    _id: mongoose.Types.ObjectId(),
    todo: reqBody.todo,
  });
  newTodo
    .save()
    .then((data) => {
      return res.json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      return res.json({
        message: "error",
        error: err,
      });
    });
});
module.exports = router;
