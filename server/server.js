const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const glob = require("glob");
const fs = require("fs");
const paginate = require("paginate-info");

const app = express();
const port = process.env.port || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public/photos")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/photos/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.array("photos"), (req, res, next) => {
  const files = req.files;
  if (!files) {
    return res.status(400).json("Please choose files");
  }
  return res.status(200).json("Images uploaded successfully");
});

app.get("/photos", (req, res) => {
  glob("*", { cwd: "./public/photos/" }, (err, files) => {
    if (err) return console.log(err);

    let filesWithDates = [];
    for (let file of files) {
      const fileDate = getFileUpdatedDate(`public/photos/${file}`);
      filesWithDates.push({ filename: file, date: fileDate });
    }
    let filesWithDatesSorted = filesWithDates.sort((a, b) => b.date - a.date);

    const {
      query: { currentPage = 1, pageSize = 30 },
    } = req;

    const paginatedData = getPaginatedData(
      currentPage,
      pageSize,
      filesWithDatesSorted
    );
    return res.status(200).send(paginatedData);
  });
});

const getFileUpdatedDate = (path) => {
  const stats = fs.statSync(path);
  return stats.mtime;
};

const getPaginatedData = (currentPage, pageSize, data) => {
  const { limit, offset } = paginate.calculateLimitAndOffset(
    currentPage,
    pageSize
  );
  const count = data.length;

  const paginatedData = data.slice(offset, offset + limit);
  const paginationInfo = paginate.paginate(
    currentPage,
    count,
    paginatedData,
    pageSize
  );

  return { result: paginatedData, meta: paginationInfo };
};

app.listen(port, () =>
  console.log(
    "Server listening on port",
    port,
    "\nAPIs\n",
    "Get Photos (GET): http://localhost:8000/photos\n",
    "Upload Photos (POST): http://localhost:8000/upload"
  )
);
