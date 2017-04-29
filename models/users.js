var mongoose = require('mongoose');
var schema = mongoose.Schema;
var userschema = new schema({
  name: String,
  email: String,
  password: String,
  scores: {}
},{collection: 'users' , minimize: false});

var users = mongoose.model('users',userschema);

module.exports = users;
