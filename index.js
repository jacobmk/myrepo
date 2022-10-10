const http = require('http');
const fs = require('fs');

const express = require('express');
const multer = require('multer');
const csv = require('fast-csv');

const Router = express.Router;

const upload = multer({ dest: 'tmp/csv/' });
const app = express();
const router = new Router();
const server = http.createServer(app);
const port = 9000


router.post('/', upload.single('file'), function (req, res) {

    console.log(req.file.path);

    const fileRows = [];

    // open uploaded file
    csv.parseFile(req.file.path)
    .on("data", function (data) {
      fileRows.push(data); // push each row
    })
    .on("end", function () {
      console.log(fileRows) //contains array of arrays. Each inner array represents row of the csv file, with each element of it a column
      fs.unlinkSync(req.file.path);   // remove temp file
      //process "fileRows" and respond
    })
});

app.use('/uploadcsv', router);

function startServer() {
    server.listen(port, function () {
      console.log('Express server listening on ', port);
    });
  }
  
  setImmediate(startServer);