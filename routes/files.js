const express = require("express");

const router = express.Router();

const model = require("../models/index");

var stream = require("stream");

const multer = require("multer");

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

router.post("/api/files/", upload.single("uploadfile"), (req, res) => {
  model.File.create({
    type: req.file.mimetype,
    name: req.file.originalname,
    data: req.file.buffer
  })
    .then(() => {
      res.send(
        "File uploaded successfully! -> filename = " + req.file.originalname
      );
    })
    .catch(error => {
      res.json({
        error: true,
        error: error
      });
    });
});

router.put("/api/files/:id", upload.single("uploadfile"), (req, res) => {
  const update_id = req.params.id;
  model.File.update(
    {
      type: req.file.mimetype,
      name: req.file.originalname,
      data: req.file.buffer
    },
    {
      where: {
        id: update_id
      }
    }
  )
    .then(() => {
      res.send(
        "File updated successfully! -> filename = " + req.file.originalname
      );
    })
    .catch(error => {
      res.json({
        error: true,
        error: error
      });
    });
});

router.get("/api/files/", (req, res) => {
  model.File.findAll({ attributes: ["id", "name"] })
    .then(files => {
      res.json(files);
    })
    .catch(error => {
      res.json({
        error: true,
        error: error
      });
    });
});

router.get("/api/files/:id", (req, res) => {
  model.File.findByPk(req.params.id)
    .then(file => {
      var fileContents = Buffer.from(file.data, "base64");
      var readStream = new stream.PassThrough();
      readStream.end(fileContents);

      res.set("Content-disposition", "attachment; filename=" + file.name);
      res.set("Content-Type", file.type);

      readStream.pipe(res);
    })
    .catch(error => {
      res.json({
        error: true,
        error: error
      });
    });
});

//DELETE /:id
router.delete("/api/files/:id", (req, res) => {
  const delete_id = req.params.id;

  model.File.destroy({
    where: {
      id: delete_id
    }
  })
    .then(() => {
      res.send("Files Deleted successfully!");
    })
    .catch(error => {
      res.json({
        error: true,
        error: error
      });
    });
});

module.exports = router;
