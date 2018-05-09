var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var csrfProtection = csrf({cookie:true});
app.use(cookieParser());

//connect MySQL
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
});

//On Page For Insert "John" in MySQL
function main(req, res){
  con.connect(function(err) {
    //if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO member (fname, lname, sex) VALUES ?";
    var values = [
      ['John', 'Highway 71','M']
    ];
    con.query(sql, [values], function (err, result, fields) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  });
}


/////////////////////////////////////////////////
//get
app.get('/',function(req,res){
  res.render('Index')
  console.log("Index Page");
  //main();  Test insert
});

app.get('/insert',function(req,res){
  res.render('Insert')
  console.log("Insert Page");
});

//in view has delete
app.get('/views',function(req,res){
  //   pkap_tests.find('pkap_tests'.toArray,function(ree,result){
  //     console.log(result);
  //   res.render('view',{data:result});
  // });
  // console.log("view Page");

  con.connect(function(err) {
    //if (err) throw err;
    //Select all customers and return the result object:
    con.query("SELECT * FROM member", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.render('view',{data:result});
    });
    console.log("view Page");
  });

});

app.get('/update/:_id',function(req,res){
  //var _id=req.params._id;
  pkap_tests.findById(req.params._id,function(err, result){

    res.render('update',{data:result})
    console.log("\nview data for update");
    console.log(result);
    });
});

app.get('/delete/:_id',function(req,res) {
  // pkap_tests.findById(req.params._id,function(err,pkap_tests){
  //   pkap_tests.remove();
  // });

  console.log(req.params._id);
  con.connect(function(err) {
    //if (err) throw err;
    var sql = "DELETE FROM member WHERE _id = "+ req.params._id;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
  });


  res.redirect('/views')
});

//#############################################################################
//post
app.post('/insert',function(req,res){
  var users = [
    fname = req.body.fname,
    lname = req.body.lname,
    sex = req.body.sex
  ]
  console.log(users);

  con.connect(function(err) {
    //if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO member (fname, lname, sex) VALUES ?";
    var values = [
      [req.body.fname, req.body.lname, req.body.sex]
    ];
    con.query(sql, [values], function (err, result, fields) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  });
  // users.save();
  res.redirect('/views')
});

app.post('/update',function(req, res){
  pkap_tests.findById(req.body._id,function(err, result){
    result.fname = req.body.fname;
    result.lname = req.body.lname;
    result.sex = req.body.sex;
    result.save();
  });
  res.redirect('../views');
});


// RUN SERVER
const port = 3000
const callback = () => console.log(`SERVER IS RUNNING AT PORT ${port}.`)
app.listen(port, callback)
module.exports = app
