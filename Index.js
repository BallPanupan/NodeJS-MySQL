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

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("\nMySQL is Connected!");
// });

// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT name = Test, address FROM customers", function (err, result, fields) {
//     if (err) throw err;
//     console.log(fields);
//   });
// });

//test insert data to MySQL
// con.connect(function(err) {
//   if (err) throw err;
//   var sql = "UPDATE customers SET address = '16/1' WHERE address = 'PANUPANx'";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log(result.affectedRows + " record(s) updated");
//   });
// });


/////////////////////////////////////////////////
//get
app.get('/',function(req,res){
  res.render('Index')
  console.log("Index Page");
});

app.get('/insert',function(req,res){
  res.render('Insert')
  console.log("Insert Page");
});

//in view has delete
app.get('/views',function(req,res){
    pkap_tests.find('pkap_tests'.toArray,function(ree,result){
      console.log(result);
    res.render('view',{data:result});
  });
  console.log("view Page");

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
  pkap_tests.findById(req.params._id,function(err,pkap_tests){
    pkap_tests.remove();
  });
  res.redirect('/views')
});


//post
app.post('/insert',function(req,res){
  var users = new pkap_tests({
    fname : req.body.fname,
    lname : req.body.lname,
    sex : req.body.sex
  })
  users.save();
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
