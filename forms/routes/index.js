var express = require('express');
var path = require('path');
var router = express.Router();
const myCrypto = require('./myCrypto');
const myMail = require('./mailAPI');
const indexModel = require('../models/indexModel');


//middleware to check user
router.use((req, res, next) => {
  if (req.url == '/' || req.url == '/login') {
    if (req.session.sunm != undefined) {
      if (req.session.srole == 'user')
        res.redirect('/users')
      else
        res.redirect('/login')
    }
    else
      next();
  }
  else
    next();
})
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: '', success: '' });
});

router.post('/', function (req, res, next) {
  var f1 = req.files.f1;

  if (f1 != undefined) {
    var f1_name = (new Date()).getTime() + '_' + f1.name;
    var despath = path.join(__dirname, '../public/uploads/profilePic', f1_name)
    f1.mv(despath);
    console.log(despath);

  }
  else
    f1_name = "logo.png";


  indexModel.register(req.body, f1_name).then((result) => {
    console.log(req.body);
    myMail(req.body);
    res.render('index', { title: req.body.email, success: 'Register Successfully..!' });
  }).catch(() => {
    console.log(err);
  })
});


router.get('/login', (req, res, next) => { res.render('login', { output: '' }) });

router.post('/login', function (req, res, next) {
  indexModel.login(req.body).then((result) => {
    if (result.length > 0) {
      // set user details in session
      req.session.sunm = result[0].email;
      req.session.srole = result[0].role;

      if (result[0].role == 'user')
        res.redirect('/users');
      else
        res.redirect('/login')
    }
    else
      res.render('login', { output: 'Invalid username or Verify your account' });
  }).catch((err) => {
    console.log(err);
  })
})
//Middleware to check cookies
var cunm = "", cpass = ""
router.use('/login', (req, res, next) => {
  if (req.cookies.cunm != undefined) {
    cunm = myCrypto.mydecrypt(req.cookies.cunm);
    cpass = myCrypto.mydecrypt(req.cookies.cpass);
  }
  next();
})

router.get('/logout', function (req, res, next) {
  req.session.destroy();
  console.log('user logged out');
  res.redirect('/login')

});


module.exports = router;
