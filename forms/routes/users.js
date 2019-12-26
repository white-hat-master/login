var express = require('express');
var router = express.Router();
const userModel = require('../models/userModel');



//Middleware to check user
router.use((req, res, next) => {
  if (req.session.sunm == undefined || req.session.srole != 'user') {
    console.log('Invalid user login..!')
    res.redirect('/login')
  }
  next();
})



/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.render('dashbord',{'sunm': req.session.sunm });
  userModel.viewUser().then((result)=>{
    res.render('dashbord',{'result':result,'sunm': req.session.sunm });
  }).catch((err)=>{
    console.log(err);  
  })
});
//manage user status
router.get('/manage-user-status', function(req, res, next){
  userModel.manageUserStatus(req.query).then((result)=>{
    res.redirect('/users');
  }).catch((err)=>{
    console.log(err)
  })
});


module.exports = router;
