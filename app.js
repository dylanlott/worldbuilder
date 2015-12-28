var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); 
var cors = require('cors'); 
var passport = require('passport'); 
var LocalStrategy = require('passport-local').Strategy; 
var session = require('express-session'); 

var routes = require('./routes/index');
var users = require('./routes/users');
var worlds = require('./routes/worlds');
var universe = require('./routes/universe');

var User = require('./controllers/UserController.js'); 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
// app.use('/users', users);
app.use('/worlds', worlds); 
app.use('/universe', universe); 

//Passport Setup
app.use(session({
    secret: 'worldbuilder', 
    resave: false,
    saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//Local login setup 
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(username, password, done) {
  User
  .findOne({ email: username })
  .exec()
  .then(function(user) {
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

//Authorization check
var requireAuth = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(403).send({message: "Logged In"   }).end();
  }
  return next();
}

//Deserializer
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//auth routes 
app.post('/users', User.createUser); 

//POST to '/users/auth'
app.post('/users/auth', passport.authenticate('local'), function(req, res) {
    console.log("Logged In"); 
    return res.status(200).json({"message":"Successfully logged in."}).end();
});

//GET to '/users/logout'
app.get('/users/logout', function(req, res){
  console.log("Logged User Out", req.user); 
  req.logout();
  res.redirect('/');
});



var mongoUri = "mongodb://localhost:27017/worldbuilder";
mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
    console.log("Connected to db at " + mongoUri);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
