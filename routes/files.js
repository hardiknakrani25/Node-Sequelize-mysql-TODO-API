const express = require("express");

const router = express.Router();

const model = require("../models/index");

var stream = require("stream");

const multer = require("multer");

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

router.post("/api/files/upload", upload.single("uploadfile"), (req, res) => {
  model.File.create({
    type: req.file.mimetype,
    name: req.file.originalname,
    data: req.file.buffer
  }).then(() => {
    res.send(
      "File uploaded successfully! -> filename = " + req.file.originalname
    );
  });
});

router.get("/api/files/getall", (req, res) => {
  model.File.findAll({ attributes: ["id", "name"] }).then(files => {
    res.json(files);
  });
});

router.get("/api/files/:id", (req, res) => {
  model.File.findByPk(req.params.id).then(file => {
    var fileContents = Buffer.from(file.data, "base64");
    var readStream = new stream.PassThrough();
    readStream.end(fileContents);

    res.set("Content-disposition", "attachment; filename=" + file.name);
    res.set("Content-Type", file.type);

    readStream.pipe(res);
  });
});

module.exports = router;
