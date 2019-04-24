const express = require("express");

const router = express.Router();

const model = require("../models/index");

router.get("/", (req, res, next) => {});

router.post("/", (req, res, next) => {});

router.put("/:id", (req, res, next) => {});

router.delete("/:id", (req, res, next) => {});

module.exports = router;
