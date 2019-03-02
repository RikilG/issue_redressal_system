const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongo = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

mongo.connect('mongodb://raj:raj1@cluster0-shard-00-00-ojo88.gcp.mongodb.net:27017,cluster0-shard-00-01-ojo88.gcp.mongodb.net:27017,cluster0-shard-00-02-ojo88.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',{useNewUrlParser:true},function(err){
if(err)
  console.log(err);
  else
console.log("connected");
});

var schema1=new Schema({ firstname:String,
                        lastname:String,
                        email:String,
                        password:String,
                        address1:String,
                        address2:String,
                        city:String,
                        state:String,
                        pincode:Number
                        });
var customer=mongo.model('customer',schema);

var schema2=new Schema({})
//serve react static files.
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => {
    console.log(req);
    res.json(req.query);
})

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
})
app.post('/register',function(req,res){
    var newcustm=new customer(req.body.json);
    newcustm.save();
});

app.post('/register',(req,res) => {
    console.log(req.body);
})

app.post('/feed',(req,res) => {
    res.json({
        issues: ['issue1','issue2','issue3','issues from '+req.body.email ]
    });
})

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
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => {
    console.log(`server running on : "http://localhost:${port}"`);
})