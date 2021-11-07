var express = require('express');
var db = require('../conf/database');
var PostModel = require('../models/Posts');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotector').userIsLoggedIn;
const {getRecentPosts,getPostById, getCommentsByPostId} = require('../middleware/postsmiddleware');

/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
  res.render('index', { title: 'Express', name:"Christopher" });            // GOES TO HOME PAGE!!!!!!
});

router.get('/login', (req, res, next) => {                             // need to create a login page in the views.hbs folder  BUT BASICALLY HWO U GET STUFF TO APPEAR
  res.render('login',  { title: 'Login'});                                                      // do this for all of the needed pages
})


router.get('/registration', (req, res, next) => {
  res.render('registration', { title: 'Registration'});
})

router.use('/postimage', isLoggedIn);         // checking if user is logged in

router.get('/postimage', (req, res, next) => {
  res.render('postimage', { title: 'Post Image'} );
})


router.get('/getPost/:id(\\d+)', getPostById, getCommentsByPostId, (req, res, next) => {
      res.render('imagepost',{title: `Post ${req.params.id}`});
    
})


module.exports = router;
