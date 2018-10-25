var express = require('express');
var morgan= require('morgan');
var mongoose = require('mongoose');
var User = require('./models/user');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsmate = require('ejs-mate');
var app = express();





mongoose.connect('mongodb://root:password12@ds145208.mlab.com:45208/ecommerce',function(err){
if(err) console.log(err);
else{
  console.log("Connected to the database");
}


})
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.engine('ejs',ejsmate);
app.set('view engine','ejs');


app.post('/create-user',function(req,res){
  var user = new User();
  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;
user.save(function(err){
  if(err) next(err);
  res.json('successfully created a new user');

});
});
app.get('/',function(req,res){
  res.render('./main/home');
})

//app.post('/')
//app.put()
//app.delete()


app.listen(3000, function(err){
  if(err) throw err;
  console.log("Server is running");
});
