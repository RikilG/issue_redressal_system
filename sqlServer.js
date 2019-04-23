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

//TODO:add check ombudsman to login
app.post("/login", (req, res) => {
  if (req.body.email === "admin@issueredressal" && req.body.password === "admin@123") {
    res.json({
      isAdmin: true,
      validUser: true
    });
  }
  else if (req.body.email === "ombudsman@issueredressal" && req.body.password === "ombud@123") {
    res.json({
      isAdmin: false,
      isOmbudsman: true,
      validUser: true
    });
  }
  else {
    con.query('select * from customer2 where email=? and password=?;', [req.body.email, req.body.password], function (err, result) {
      if(result.length==0) {
        con.query('select * from serviceProvider where email=? and password=?;', [req.body.email, req.body.password], function(err, result2) {
          if(result2.length==0) {
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
      if (err) throw err;
    });
  }
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
  con.query('select * from customer2 where email=?',[req.body.email], function(err, data) {
    if(data.length==0) {
      con.query('insert into customer2 values(?,?,?,?,?,?,?,?,?)',[null,req.body.email,req.body.password,
      req.body.fname,req.body.lname,req.body.location,req.body.pincode,req.body.mobile,req.body.aadhaar], function(err, data2) {
        if(err) throw err;
        con.query('select * from customer11 where pincode=?',[req.body.pincode], function(err, data3) {
          if(data3.length==0) con.query('insert into customer11 values(?,?)',[req.body.pincode,req.body.city]);
        });
        con.query('select * from customer12 where city=?',[req.body.city], function(err, data3) {
          if(data3.length==0) con.query('insert into customer12 values(?,?)',[req.body.city,req.body.state]);
        });
        res.json({ accepted: true });
      });
    }
    else {
      res.json({ accepted: false });
    }
  });
});

app.post("/regFreelancer", function (req, res) {
  con.query('select * from serviceProvider where email=?',[req.body.email], function(err, data) {
    if(data.length===0) {
      con.query('insert into serviceProvider values(?,?,?,?,?,?,?)',[null,req.body.fname,req.body.lname,req.body.email,
        req.body.password,req.body.pincode,req.body.mobile], function(err, data) {
        if(err) throw err;
        res.json({ accepted: true });
      });
    }
    else {
      res.json({ accepted: false });
    }
  });
});

app.post("/postIssue", function (req, res) {
  var id=0;
  con.query('select deptId from department where dname=?',[req.body.nature],function(err,data){
    if(data.length==0) {
      con.query('insert into department values(?,?)',[null,req.body.nature], (err,data) => {
        con.query('select deptId from department where dname=?',[req.body.nature],function(err,data2){ id=data[0].deptId });
      });
    }
    else {
      id=data[0].deptId;
    }
    con.query('insert into issue values(?,?,?,?,?,?,?,?)',[null,req.body.name,req.body.email,req.body.pay,req.body.type,
      req.body.dsc,id,req.body.status],function(err,data){
        if(err) throw err;
        res.json({});
      });
  });
});

app.post("/acceptIssue", (req, res) => {
  con.query('update issue set status="Issue taken up by Freelancer" where issId=?',[req.body.id], function(err,data) {
    con.query('insert into takenIssues values((select spId from serviceProvider where email=?),?,(select NOW()))',[req.body.email,req.body.id], function(err,data) {
      if (err) {
        res.json({ errorStatus: true });
        throw err;
      }
      else res.json({ errorStatus: false });
    })
  });
})

app.post('/feed', (req, res) => {
    con.query('select * from issue i,department d where d.deptId=i.deptId and email=?',[req.body.email], function(err, issues) {
      con.query('select * from issue where type="Community"', function(err, communityIssues) {
        res.send({
                 myIssues: issues,
                 comIssues: communityIssues
        });
      });
    });
});

app.post('/spfeed', (req, res) => {
  con.query('select * from issue where status="Pending" and type!="Government"', function(err, issues) {
    con.query('select * from issue i,takenIssues ti where i.issId=ti.issId and status="Issue taken up by Freelancer" and ti.spId=(select spId from serviceProvider where email=?)', [req.body.email], (err, ai) => {
      res.json({
        allIss: issues,
        acptdIss: ai
      });
    });
  });
});

app.post("/editIssue", (req, res) => {
    con.query('update issue set title=?,email=?,pay=?,type=?,dsc=?,deptId=(select deptId from department where dname=?) where issId=?',[req.body.name,req.body.email,req.body.pay,req.body.type,
      req.body.dsc,req.body.nature,req.body.id], function(err, data) {
      if(err) throw err;
      res.json({ accepted: true });
    });
});

app.post('/redirectGovt', (req, res) => {
  con.query('update issue set type="Government" where issId=?',[req.body.id], function(err,data) {
    if (err) {
      res.json({ errorStatus: true });
      throw err;
    }
    else res.json({ errorStatus: false });
  });
})

app.post('/admin', (req, res) => {
  if (req.body.email === "admin@issueredressal") {
    con.query('select * from customer2 c2,customer11 c11,customer12 c12 where c2.pincode=c11.pincode and c12.city=c11.city', function(err,customers) {
      con.query('select * from issue i,department d where d.deptId=i.deptId', function(err, issues) {
        con.query('select * from serviceProvider', function(err, freelancers) {
          res.json({
            allCus: customers,
            allIss: issues,
            allFreelan: freelancers
          });
        });
      });
    });
  }
  else {
    res.json({});
  }
});


app.post("/adminDelete", (req, res) => {
  switch (req.body.documentName) {
    case "Issue":
      con.query('delete from issue where issId=?',[req.body.id], function(err,data) {
        if (err) {
          res.json({ errorStatus: true });
          throw err;
        }
        else res.json({ errorStatus: false });
      });
      break;
    case "Freelancer":
      con.query('delete from serviceProvider where spId=?',[req.body.id], function(err,data) {
        if (err) {
          res.json({ errorStatus: true });
          throw err;
        }
        else res.json({ errorStatus: false });
      });
      break;
    case "Customer":
    con.query('delete from customer2 where cusId=?',[req.body.id], function(err,data) {
        if (err) {
          res.json({ errorStatus: true });
          throw err;
        }
        else res.json({ errorStatus: false });
      });
      break;
  }
});

app.post('/feedDelete', (req, res) => {
  con.query('delete from issue where issId=?',[req.body.id],function(err, data) {
    if (err) { res.json({ errorStatus: true }); throw err; }
    else res.json({ errorStatus: false });
  });
});

app.post('/Ombudsman', (req, res) => {
  //TODO:do not hardcode ombudsman
  if (req.body.email === "ombudsman@issueredressal") {
    con.query('select * from issue where type="Government" and status!="In Progress" and status!="Completed"',function(err, untracked) {
      con.query('select * from issue where type="Government" and status="In Progress"', function (er, tracked) {
        con.query('select * from issue where type="Government" and status="Completed"', function (er, completed) {
          res.json({
            trakedIssues: tracked,
            untrackedIssues: untracked,
            completedIssues: completed
          });
        });
      });
    });
  }
})

app.post('/ombudTrack', (req, res) => {
  con.query('update issue set status=? where issId=?',[req.body.newStatus, req.body.id], function(err, data) {
    if (err) {
      res.json({ errorStatus: true });
      throw err;
    }
    else res.json({ errorStatus: false });
  });
});

app.listen(port, () => {
  console.log(`server running on : "http://localhost:${port}"`);
});