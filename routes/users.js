var express = require('express');
var router = express.Router();
var User = require('../controllers/UserController.js'); 
var passport = require('passport'); 
var LocalStrategy = require('passport-local').Strategy; 

//local login setup 
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(username, password, done) {
    console.log(username, password)
    User.findOne({ email: username }).exec().then(function(user) {
        if (!user) {
            return done(null, false);
            console.log('no user');
        }
        user.comparePassword(password).then(function(isMatch) {
            if (!isMatch) {
                console.log('no match');
                return done(null, false);
            }
            return done(null, user);
        });
    });
}));

//authorization check
var requireAuth = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(403).send({message: "Logged In"   }).end();
    }
    return next();
}

//deserializer
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

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
