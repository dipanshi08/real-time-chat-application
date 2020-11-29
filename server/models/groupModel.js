const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
  groupname: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  hostname: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  type: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  chathistory: {
    type: [Object],
    trim: true,
  },
  members: {
    type: [String],
    trim: true,
  },
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;