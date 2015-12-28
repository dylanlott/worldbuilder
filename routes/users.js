var express = require('express');
var router = express.Router();
var User = require('../controllers/UserController.js'); 
var passport = require('passport'); 
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose'); 
var app = express();
var session = require('express-session'); 

/* ENDPOINTS
**********************************************************************/
//Auth

// POST to '/users/'
router.post('/', User.createUser); 

//POST to '/users/auth'
router.post('/auth', passport.authenticate('local'), function(req, res) {
    console.log("Logged In"); 
    return res.status(200).json({"message":"Successfully logged in."}).end();
});

//GET to '/users/logout'
router.get('/logout', function(req, res){
  console.log("Logged User Out", req.user); 
  req.logout();
  res.redirect('/');
});



module.exports = router;
