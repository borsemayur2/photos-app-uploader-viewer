const express = require("express");
const cors = require("cors");
const multer = require("multer");

const port = process.env.port || 8000;

const app = express();

app.use(cors());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

app.post("/upload", upload.array("files"), (req, res, next) => {
  const files = req.files;

  if (!files) {
    return res.status(400).json("Please choose files");
  }
  return res.status(200).json("Images uploaded successfully");
});

app.listen(port, () => console.log("Server listening on port", port));