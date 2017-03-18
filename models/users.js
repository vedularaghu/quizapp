var mongoose = require('mongoose');
var schema = mongoose.Schema;
var userschema = new schema({
  name: String,
  email: String,
  password: String
},{collection: 'users'});

var users = mongoose.model('users',userschema);

module.exports = users;
