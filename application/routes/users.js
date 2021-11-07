var express = require('express');
var router = express.Router();
var db = require('../conf/database');
const { errorPrint, successPrint } = require('../helpers/debug/debugprinters')
const UserError = require('../helpers/error/UserError')
var bcrypt = require('bcrypt');
const UserModel = require('../models/Users');



/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});



router.post('/register', (req, res, next) => {              // need to validate this on the backend
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let cpassword = req.body.password;

  UserModel.usernameExists(username)
    .then((userDoesExist) => {
      if (userDoesExist) {
        throw new UserError(
          "REGISTRATION FAILED: Email already exists",
          "/registration",
          200
        );
      } else {
        return UserModel.emailExists(email);
      }
    })
    .then((emailDoesExist) => {
      if (emailDoesExist) {
        throw new UserError(
          "REGISTRATION FAILED: Email already exists",
          "/registration",
          200
        );

      } else {
        return UserModel.create(username, password, email);
      }
    })
    .then((createdUserId) => {
      if (createdUserId < 0) {
        throw new UserError(
          "SERVER ERROR, user could not be created",
          "/registration",
          500
        );
      } else {
        successPrint("User.js --> User was created!!");
        req.flash('success', 'User account has been made!');
        res.redirect('/login');
      }
    })
    .catch((err) => {
      errorPrint("User could not be made", err);
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        req.flash('error', err.getMessage());
        res.status(err.getStatus());
        res.redirect(err.getRedirectURL());
      } else {
        next(err);
      }
    })
})


router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  if (username && password) {     // replace this with validation
    console.log("test: ")
    console.log(username);
    console.log(password);
  }

  UserModel.authenticate(username, password)
    .then((loggedUserId) => {
      if (loggedUserId > 0) {
        successPrint(`User ${username} is logged in`);
        req.flash('success', 'You have been successfuly logged in!');
        //res.cookie("logged",username,{expires: new Date(Date.now() + 900000000), httpOnly: false});                  THIS IS COOKIE VER OF MAKING USER "logged in"
        req.session.username = username;                                // this creates a session for the current user
        req.session.userId = loggedUserId;
        console.log(req.session);
        res.locals.logged = true;
        //res.render('index');
        res.redirect('/');
      } else {
        throw new UserError("invalid username and/or password", "/login", 200);
      }
    })
    .catch((err) => {
      errorPrint("user login failed");
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        req.flash('error', err.getMessage());
        res.status(err.getStatus());
        res.redirect('/login');
      } else {
        next(err);
      }
    })
});


router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      errorPrint('session could not be destroyed');
      next(err);
    } else {
      successPrint('session was destroyed');
      res.clearCookie('csid');
      res.json({ status: "OK", message: "user is logged out" });
    }
  });




})

module.exports = router;
