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

module.exports = quiz;
