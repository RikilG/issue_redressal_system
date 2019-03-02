const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

//serve react static files.
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => {
    console.log(req);
    res.json(req.query);
});

app.post('/login',(req,res) => {
    // console.log(req.body);
    if(req.body.email === "admin@issueredressal") {
        res.json({
            validUser: true,
            isAdmin: true
        });
    }
    else {
        res.json({
            validUser: true,
            isAdmin: false
        });
    }
});

app.post('/register',(req,res) => {
    res.json({
        status: "accepted"
    });
});

app.post('/postIssue',(req,res) => {
    res.json({
        status: "accepted"
    });
});

app.post('/feed',(req,res) => {
    res.json({
        issues: ['issue1','issue2','issue3','issues from '+req.body.email ]
    });
});

app.post('/admin',(req,res) => {
    console.log(req.body);
    if(req.body.email === "admin@issueredressal") {
        res.json({
            users: ['user1','user2','user3'],
            issues: ['issue1','issue2','issue3','issues from '+req.body.email ]
        });
    }
    else {
        res.json({  });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => {
    console.log(`server running on : "http://localhost:${port}"`);
});