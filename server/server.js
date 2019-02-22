const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => {
    console.log(req);
    res.json(req.query);
})

app.post('/login',(req,res) => {
    console.log(req.body);
    res.json({request: "received!!!"});
})

app.listen(port, () => {
    console.log(`server running on : "http://localhost:${port}"`);
})