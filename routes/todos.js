const express = require("express");

const router = express.Router();

const model = require("../models/index");

//Get todos
router.get("/", (req, res, next) => {
  model.Todo.findAll({})
    .then(todos =>
      res.json({
        error: false,
        data: todos
      })
    )
    .catch(error =>
      res.json({
        error: true,
        data: [],
        error: error
      })
    );
});

//creaet new todo
//post request

router.post("/", (req, res, next) => {
  const { title, description } = req.body;
  model.Todo.create({
    title: title,
    description: description
  })
    .then(todo =>
      res.status(201).json({
        error: false,
        data: todo,
        message: "New todo has been created."
      })
    )
    .catch(error =>
      res.json({
        error: true,
        data: [],
        error: error
      })
    );
});

//update todo using id

router.put("/:id", (req, res, next) => {
  let todo_id = req.params.id;
  const { title, description } = req.body;

  model.Todo.update(
    {
      title: title,
      description: description
    },
    {
      where: {
        id: todo_id
      }
    }
  )
    .then(todo =>
      res.json({
        error: false,
        message: "Todo is updated."
      })
    )
    .catch(error =>
      res.json({
        error: true,
        error: error
      })
    );
});

router.delete("/:id", (req, res, next) => {});

module.exports = router;
