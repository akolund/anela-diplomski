const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/databaseJS');

const User= require('../model/user');


//Regiter
router.post('/register', (req, res, next) =>{
  // console.log('REGISTER');
  // res.send('REGISTER');
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser,(err, user)=>{
    if (err){
      res.json({success: false, msg:'Failed to register user'});
    }else{
      res.json({success: true, msg:'User registered '});

    }
  });
});

//Authenticate
router.post('/authenticate', (req, res, next) =>{
 //res.send('AUTHENTICATE');
  const username = req.body.username;
  const password = req.body.password;
  User.getUserByUsername(username,(err,user)=>{
    //console.log('getUserByUsername');

    if(err) throw err;
    if(!user){
      return res.json({success:false, msg:'User not found'});
    }
    User.comparePassword(password, user.password,(err,isMatch)=>{
      // console.log('comparePassword');
      if(err) throw err;
      if(isMatch){
    // console.log("EEEEEEEEEEEEEEEEEEE");
    const token = jwt.sign({data: user}, config.secret, { expiresIn: 604800 });﻿
// const token = jwt.sign({data: user}, config.secret, { expiresIn: 604800 });
    // console.log(token);
        res.json({
          success:true,
          token:'JWT '+token,   //ZNACI ---> RAZMAK!!!!!!!!!!!!!!!
          user:{
            id:user._id,
            name:user.name,
            username:user.username,
            email: user.email
          }
        });
      }else{
        return res.json({success:false, msg:'Wrong password'});
      }
    });
  });

});

//Profile      passport.authenticate('jwt', { session: false }),
router.get('/profile', passport.authenticate('jwt', { session: false} ),  function(req, res,next) {
  // res.send('PROFILE');
// console.log('PROFILE');
         res.json({user: req.user});
     }
  // res.json({user: req.user});
);

module.exports = router;
