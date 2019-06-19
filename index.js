const moment = require('moment');
const http = require('http');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');


const port = process.env.PORT || 3000;

app.set('view engine','ejs');
app.use('/assest',express.static(__dirname + '/public'));


//middleware bodyParser module
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// expressValidator middleware module
app.use(expressValidator({

    errorFormatter: function(param, msg, value){
    var namespace = param.split('.')
    , root    = namespace.shift()
    , formParam = root;
    while(namespace.length){
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.get('/',function(req,res){
  res.render('mainproject');
});

app.get('/login',function (req,res){
  res.render('login');
});

app.get('/video',function (req,res){
  res.render('video');
});

// app.get('/person/:sufi',function(req,res){
//   console.log(req);
//   res.send(req.params.sufi);
// })

app.get('/signup', function(req,res){
  res.render('signup');
})


app.post('/signup', function(req, res){
// adding rules to the login form
// creating a variable called errors
// checking to see if there is any errors by creating an if function
// creating an object for the form inputs

  req.checkBody('firstName','You need to enter your first name in order to continue').notEmpty();
  req.checkBody('lastName','You need to enter your last name in order to continue').notEmpty();
  req.checkBody('email','You need to enter your a valid email address').notEmpty();
  req.checkBody('phoneNumber','You need to enter your a valid phone number').notEmpty();
 var errors = req.validationErrors();
 if(errors){
   console.log('ERRORS')
 } else {

   var newUser = {
     firstName: req.body.firstName,
     lastName: req.body.lastName,
     email: req.body.email,
     phoneNumber: req.body.phoneNumber
   }
   console.log('SUCCESS');
 }

 // console.log(newUser); //testing to see if the info of the newUser comes in the log
});

app.listen(port,'0.0.0.0');
