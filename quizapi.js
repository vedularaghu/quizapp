
var request = require("request");
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var quizschema = new schema({
  description: String,
  options: [String],
  correct: String,
  cid : Number,
  qid: Number
}, {collection: 'quiz'});

var quiz = mongoose.model('quiz',quizschema);
function random(0,3){
  return Math.floor(Math.random()*(3-0)+0);
}

request({
  url:"https://opentdb.com/api.php?amount=5&category=19&difficulty=medium&type=multiple" ,
  method: "GET",
  followRedirect: true,
}, function(err , res , body ){
  body = JSON.parse(body);

  for (var i = 0; i <body.results.length; i++) {
    var question = body.results[i];
    var new_obj = {};
  }
});
