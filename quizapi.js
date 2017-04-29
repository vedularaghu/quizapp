
var request = require("request");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quizappdb');
db = mongoose.connection;
var schema = mongoose.Schema;
var quizschema = new schema({
  description: String,
  options: [String],
  correct: String,
  cid : Number,
  qid: Number
}, {collection: 'quiz'});

var quiz = mongoose.model('quiz',quizschema);

db.once('open',function(){
    console.log('connection established to db');
    request({
      url:"https://opentdb.com/api.php?amount=15&category=17&difficulty=easy&type=multiple" ,
      method: "GET",
      followRedirect: true,
    }, function(err , res , body ){
      body = JSON.parse(body);
      for(var j = 1; j < 4; j++){
        for (var i = (j-1)*5; i <j*5; i++) {
          var randomnum = Math.floor(Math.random()*4);
          var question = body.results[i];
          var new_obj = new quiz();
          new_obj.description = question.question;
          console.log(new_obj);
          question.incorrect_answers.splice(randomnum,0,question.correct_answer);
          new_obj.options = question.incorrect_answers
          new_obj.correct = String.fromCharCode(97+randomnum);

          new_obj.cid = 1;
          new_obj.qid = j;
          new_obj.save(function(err,save){
            if(err){
              console.log(err);
            }else{
              console.log("Saved Succesfully");
            }
          });
        }
      }
    });
});
