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

router.post("/", (req, res, next) => {});

router.put("/:id", (req, res, next) => {});

router.delete("/:id", (req, res, next) => {});

module.exports = router;
