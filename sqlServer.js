const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 5000;

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mydb"
});
  
con.connect(function(err) {
    if (err) {throw err;}
    console.log("Connected!");
});

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());
app.use(cors())

// con.query('select * from members;', function (err, result) {
//     if (err) throw err;
//     console.log(result);
// });

app.listen(port, () => {
  console.log(`server running on : "http://localhost:${port}"`);
});