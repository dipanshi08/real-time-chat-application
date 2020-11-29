const express = require("express");
const router = express.Router();
let Group = require('../models/groupModel');


// =======================
// Routes
// =======================

router.route('/').get((req, res) => {
  Group.find()
  .then(groups => res.json(groups))
  .catch(err => res.json('Error: ' + err).status(400));
});

router.route('/public').get((req, res) => {
  Group.find({ type: 'public'})
    .then(groups => res.json(groups))
    .catch(err => res.json('Error: ' + err).status(400));
});

router.route('/add').post((req, res) => {
  const groupname = req.body.groupname;
  const hostname = req.body.username;
  const type = req.body.type;
  const newGroup = new Group({groupname,hostname,type});

  newGroup.save()
    .then(() => res.json('Group added!'))
    .catch(err => res.json('Error: ' + err).status(400));
  
});

router.route('/search/:groupname').get((req, res) => {
  const groupname = req.params.groupname;
  Group.findOne({ groupname: groupname})
    .then(result => {
      if(result == null)
        res.json("Group doesn't exist")
      else{
        res.json("success")
      }
    })
    .catch(err => res.json('Error: ' + err).status(400));
});

router.route('/savechat').post((req, res) => {
  const groupname = req.body.groupname;
  const msg = req.body.msg;

  Group.updateOne({ groupname: groupname }, { chathistory: chathistory+msg })
        .then(result => {
            res.json(result)
        })
        .catch(err => res.json('Error: ' + err).status(400));
  
});

router.route('/getchat/:groupname').get((req, res) => {
  const groupname = req.params.groupname;
  Group.findOne({ groupname: groupname})
    .then(result => {
      if(result == null)
        res.json("Group doesn't exist")
      else{
        res.json(result.chathistory)
      }
    })
    .catch(err => res.json('Error: ' + err).status(400));
  
});

module.exports = router;
