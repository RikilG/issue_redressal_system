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

var schema1=new mongo.Schema({ fname:String,
                        lname:String,
                        email:String,
                        password:String,
                        address1:String,
                        address2:String,
                        city:String,
                        state:String,
                        pincode:Number
                        });
var customer=mongo.model('customer',schema1);

var schema2=new mongo.Schema({complaintName:String,
                            email:String,
                            pay:Number,
                            type:String,
                            workNature:String,
                            description:String
                            });
var issue=new mongo.model('issue',schema2);

//serve react static files.
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => {
    console.log(req);
    res.json(req.query);
});

app.post('/login',(req,res) => {
    if(req.body.email==="admin@issueredressal"&&req.body.password==="admin@123"){
        res.json({
            isAdmin:true,
            validUser:true
        });
    }
    else{
    customer.findOne({email:req.body.email},function(err,data){
        if(data===null){
            res.json({    
                validUser:false,
                isAdmin:false
            });
        }
        else{
            if(data.password===req.body.password){
                res.json({
                    validUser:true,
                    isAdmin:false
                });
            }
            else{
                res.json({    
                    validUser:false,
                    isAdmin:false
                });
            }
        }
    });
  }
})
app.post('/register',function(req,res){
    var newcustm=new customer(req.body);
    customer.findOne({email:req.body.email},function(err,data){
        if(data==null){
            newcustm.save();
         res.json({
           accepted:true
        });
       }
       else{
           res.json({accepted:false});
       }
    });
});

app.post('/postIssue',function(req,res){
    var newissue=new issue(req.body);
    newissue.save();
    res.json({});
});

app.post('/feed',(req,res) => {
    issue.find({email:req.body.email},function(err,issues){
        //console.log();
        res.send(issues);
    })
});

app.post('/admin',(req,res) => {
    console.log(req.body);
    if(req.body.email === "admin@issueredressal") {
        customer.find({},function(err,custms){
            issue.find({},function(er,issues){
                res.json({
                    allCus:custms,
                    allIss:issues
                });
            });
        });
    }
    else {
        res.json({ });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => {
    console.log(`server running on : "http://localhost:${port}"`);
});