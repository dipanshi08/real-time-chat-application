const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const config = require("../config");
let User = require('../models/userModel');

// =======================
// Nodemailer Setup
// =======================
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.nodemailer.mail,
        pass: config.nodemailer.password
    }
});


// =======================
// Routes
// =======================

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.json('Error: ' + err).status(400));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  const newUser = new User({username,password,email,});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.json('Error: ' + err).status(400));
  
});

router.route('/login').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: username, password:password })
    .then(result => {
      if(result == null)
        res.json("fail")
      else
        res.json("success")
    })
    .catch(err => res.json('Error: ' + err).status(400));
});

router.route('/changepassword').post((req, res) => {
  const username = req.body.username;
  const oldpassword = req.body.oldPassword;
  const newpassword = req.body.newPassword;
  User.updateOne({ username: username , password:oldpassword}, { password: newpassword })
    .then(result => {
        if(result.n == 0)
          res.json("Record not Found")
        else
          res.json("success")
    })
    .catch(err => res.json('Error: ' + err).status(400));
});

router.route('/forgotpassword/:username').get((req, res) => {
  const username = req.params.username;
  User.findOne({ username: username}, 'email')
    .then(result => {
      if(result == null)
        res.json("nouser")
      else
      {
        var email = result.email;
        var rstring = randomstring.generate(6);
        var mailOptions = {
            from: config.nodemailer.mail,
            to: email,
            subject: 'New Password',
            text: 'Hey ' + username +', your one time password is '+ rstring 
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }
            else{        
                console.log('Email sent: ' + info.response);
            }
        });
        User.updateOne({ username: username }, { password: rstring })
        .then(result => {
            res.json(result)
        })
        .catch(err => res.json('Error: ' + err).status(400));
        res.json(result)
      }  
    })
    .catch(err => res.json('Error: ' + err).status(400));     

});

router.route('/delete').delete((req, res) => {
  User.deleteMany({email: "ss" });
});

module.exports = router;

