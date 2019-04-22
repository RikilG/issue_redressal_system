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

// con.query('select * from members;', function (err, result) {
//     if (err) throw err;
//     console.log(result);
// })

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());
app.use(cors())

app.post("/login", (req, res) => {
  if (req.body.email === "admin@issueredressal" && req.body.password === "admin@123") {
    sitelog("Admin logged in");
    res.json({
      isAdmin: true,
      validUser: true
    });
  }
  else if (req.body.email === "ombudsman@issueredressal" && req.body.password === "ombud@123") {
    sitelog("Ombudsman logged in");
    res.json({
      isAdmin: false,
      isOmbudsman: true,
      validUser: true
    });
  }
  else {
    con.query('select * from customer where email=? and password=?;', [req.body.email, req.body.password], function (err, result) {
      if (err) throw err;
      if(result.length==0) {
        con.query('select * from serviceProvider where email=? and password=?;', [req.body.email, req.body.password], function(err, result2) {
          if (err) throw err;
          if(result.length==0) {
            res.json({
              isCustomer: false,
              isAdmin: false,
              isSP: false
            });
          }
          else {
            res.json({
              isCustomer: false,
              isAdmin: false,
              isSP: true
            });
          }
        })
      }
      else {
        res.json({
          isCustomer: true,
          isAdmin: false,
          isSP: false
        });
      }
    });
  }
})

app.post("/comcard2", (req, res) => {
  // voter.countDocuments({ issueid: req.body.issueid, type: "upvote" }, function (err, count1) {
  //   voter.countDocuments({ issueid: req.body.issueid, type: "downvote" }, function (err, count2) {
  //     res.send({
  //       nou: count1,
  //       nod: count2
  //     });
  //   });
  // });
})

app.post("/comcard", (req, res) => {
  // var newvoter = new voter(req.body);
  // voter.findOne({ email: req.body.email, issueid: req.body.issueid }, function (err, data) {
  //   if (data == null) {
  //     newvoter.save();
  //     res.json({
  //       accepted: true
  //     });
  //   } else {
  //     voter.findByIdAndUpdate(data._id, { "$set": { type: req.body.type } }, err => {
  //       if (err) res.json({ errorStatus: true });
  //       else res.json({ errorStatus: false });
  //     });
  //   }
  // })
})

app.post("/register", function (req, res) {
  // var newcustm = new customer(req.body);
  // customer.findOne({ email: req.body.email }, function (err, data) {
  //   if (data == null) {
  //     newcustm.save();
  //     sitelog("New Customer: { email: " + req.body.email + " }");
  //     res.json({
  //       accepted: true
  //     });
  //   } else {
  //     res.json({ accepted: false });
  //   }
  // });
});

app.post("/regFreelancer", function (req, res) {
  // var newFreelancer = new freelancer(req.body);
  // freelancer.findOne({ email: req.body.email }, function (err, data) {
  //   if (data == null) {
  //     newFreelancer.save();
  //     sitelog("New Freelancer: { email: " + req.body.email + " }");
  //     res.json({
  //       accepted: true
  //     });
  //   } else {
  //     res.json({ accepted: false });
  //     sitelog("Freelancer register rejected : { email: " +req.body.email+ " }");
  //   }
  // });
});

app.post('/postcomment',function(req,res){
  // issue.findByIdAndUpdate(req.body.id,{comments:req.body.comments},function(err,data){
  //   if(err){
  //     console.log(err);
  //   }
  //   else{
  //     res.json({res:"successful"});
  //   }
  // });
});

app.post('/loadcomments',function(req,res){
  // issue.findOne({_id:req.body.issueid},function(err,data){
  //   res.json({comments:data.comments});
  // });
});

app.post("/regOrganization", function (req, res) {
  // var newOrganization = new organization(req.body);
  // organization.findOne({ email: req.body.email }, function (err, data) {
  //   if (data == null) {
  //     newOrganization.save();
  //     res.json({
  //       accepted: true
  //     });
  //   } else {
  //     res.json({ accepted: false });
  //     sitelog("Organization register rejected : { email: "+req.body.email+" }");
  //   }
  // });
});

app.post("/postIssue", function (req, res) {
  // var newissue = new issue(req.body);
  // newissue.save();
  // res.json({});
});

app.post("/acceptIssue", (req, res) => {
  // issue.findByIdAndUpdate(req.body.id, { status: "Issue taken up by Freelancer", acceptedBy: req.body.email }, (err) => {
  //   if (err) {
  //     res.json({ errorStatus: true });
  //     console.log(err);
  //   }
  //   else res.json({ errorStatus: false });
  // });
})

app.post('/feed', (req, res) => {
  // issue.find({ email: req.body.email }, function (err, issues) {
  //   issue.find({ type: "Community" }, function (err, communityIssues) {
  //     res.send({
  //       myIssues: issues,
  //       comIssues: communityIssues
  //     });
  //   })
  // })
});

app.post('/spfeed', (req, res) => {
  // issue.find({ status: "Pending", type: {$ne: "Government"} }, (err, issues) => {
  //   issue.find({ status: "Issue taken up by Freelancer", acceptedBy: req.body.email }, (err, ai) => {
  //     res.json({
  //       allIss: issues,
  //       acptdIss: ai
  //     });
  //   });
  // });
});

app.post("/editIssue", (req, res) => {
  // let editissue = new issue(req.body);
  // issue.findByIdAndUpdate(req.body.id, { "$set": { complaintName: editissue.complaintName, email: editissue.email, pay: editissue.pay, type: editissue.type, workNature: editissue.workNature, description: editissue.description, tstart: editissue.tstart, tend: editissue.tend } }, (err) => {
  //   if (err) {
  //     res.json({ errorStatus: true });
  //   }
  //   else res.json({ errorStatus: false });
  // });
});

app.post('/redirectGovt', (req, res) => {
  // issue.findByIdAndUpdate(req.body.id, { type: "Government" }, (err) => {
  //   if (err) {
  //     res.json({ errorStatus: true });
  //     console.log(err);
  //   }
  //   else res.json({ errorStatus: false });
  // });
})

app.post('/admin', (req, res) => {
  // if (req.body.email === "admin@issueredressal") {
  //   customer.find({}, function (err, customers) {
  //     issue.find({}, function (er, issues) {
  //       freelancer.find({}, function (err, freelancers) {
  //         organization.find({}, function (err, organizations) {
  //           res.json({
  //             allCus: customers,
  //             allIss: issues,
  //             allFreelan: freelancers,
  //             allOrgs: organizations
  //           });
  //         });
  //       });
  //     });
  //   });
  // }
  // else {
  //   res.json({});
  // }
});

app.post('/dashboard', (req, res) => {
  // if (req.body.email === "admin@issueredressal") {
  //   customer.countDocuments({}, function (err, customers) {
  //     issue.countDocuments({}, function (er, issues) {
  //       freelancer.countDocuments({}, function (err, freelancers) {
  //         organization.countDocuments({}, function (err, organizations) {
  //           res.json({
  //             noc: customers,
  //             noi: issues,
  //             nof: freelancers,
  //             noo: organizations
  //           });
  //         });
  //       });
  //     });
  //   });
  // }
  // else {
  //   res.json({});
  // }
});

app.post("/adminDelete", (req, res) => {
  // switch (req.body.documentName) {
  //   case "Issue":
  //     issue.deleteOne({ _id: req.body.id }, err => {
  //       if (err) res.json({ errorStatus: true });
  //       else res.json({ errorStatus: false });
  //     });
  //     break;
  //   case "Freelancer":
  //     freelancer.deleteOne({ _id: req.body.id }, err => {
  //       if (err) res.json({ errorStatus: true });
  //       else res.json({ errorStatus: false });
  //     });
  //     break;
  //   case "Organization":
  //     organization.deleteOne({ _id: req.body.id }, err => {
  //       if (err) res.json({ errorStatus: true });
  //       else res.json({ errorStatus: false });
  //     });
  //     break;
  //   case "Customer":
  //     customer.deleteOne({ _id: req.body.id }, err => {
  //       if (err) res.json({ errorStatus: true });
  //       else res.json({ errorStatus: false });
  //     });
  //     break;
  // }
});

app.post('/feedDelete', (req, res) => {
  // issue.deleteOne({ _id: req.body.id }, err => {
  //   if (err) res.json({ errorStatus: true });
  //   else res.json({ errorStatus: false });
  // });
});

app.post('/Ombudsman', (req, res) => {
  // if (req.body.email === "ombudsman@issueredressal") {
  //   issue.find({ type: "Government", status: { $nin: ["In Progress", "Completed"] } }, function (er, untracked) {
  //     issue.find({ type: "Government", status: "In Progress" }, function (er, tracked) {
  //       issue.find({ type: "Government", status: "Completed" }, function (er, completed) {
  //         res.json({
  //           trakedIssues: tracked,
  //           untrackedIssues: untracked,
  //           completedIssues: completed
  //         });
  //       });
  //     });
  //   });
  // }
})

app.post('/ombudTrack', (req, res) => {
  // issue.findByIdAndUpdate(req.body.id, { status: req.body.newStatus }, (err) => {
  //   if (err) {
  //     res.json({ errorStatus: true });
  //     console.log(err);
  //   }
  //   else res.json({ errorStatus: false });
  // });
});

app.listen(port, () => {
  console.log(`server running on : "http://localhost:${port}"`);
});