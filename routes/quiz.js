var express = require('express');
var router = express.Router();
var quiz = require('../models/quiz');
var User = require('../models/users');
function authenticate(req,res,next){
  if(req.session && req.session.user){
    next();
  }else{
    res.redirect('/');
  }
}

function assign(obj , keyPath , value){
  LastKeyIndex = keyPath.length-1;
  for (var i = 0; i < LastKeyIndex; i++) {
    Key = keyPath[i];
    if(!(Key in obj))
      obj[Key] = {}
    obj = obj[Key];
    }
  obj[keyPath[LastKeyIndex]] = value;
  }

router.post('/add', function(req,res,next){
  var options = [req.body.a,req.body.b,req.body.c,req.body.d];
  var newquiz = new quiz({
    description: req.body.description,
    options: options,
    correct: req.body.correct,
    cid: req.body.cid,
    qid: req.body.qid
  });
  newquiz.save(function(err,quiz){
    if(err){
      console.log(err);
      res.send(err);
    }else{
      res.redirect('/quiz/add?msg=Succesfully%20saved');
    }
  });
});
router.get('/add',function(req,res,next){
  res.render('adminpanel');
});

router.get('/get/:cid/:qid',function(req,res,next){
  quiz.find({cid: req.params.cid , qid: req.params.qid},function(err , quizes){
    if(err){
      console.log(err);
      res.send(err);
    }else{
      res.render('quiz',{quizzes:quizes , qid : req.params.qid, cid : req.params.cid});
    }
  });
});
router.post('/submit/:cid/:qid',authenticate , function(req,res,next){
  var obj = {cid: req.params.cid , qid: req.params.qid}
  quiz.find(obj,function(err , questions){
    if(err){
      console.log(err);
      req.send(err);
    }else{
      var score=0;
      for (var i = 0; i < questions.length; i++) {
          if(req.body['q_no_'+i]==questions[i].correct){
          score++;
          // console.log(score);
        }
      }
    var sc = obj.cid+'_'+obj.qid;
    console.log(obj.cid+'_'+obj.qid);
    var obj1 = {
      $set : { }
    };
    obj1.$set['scores.'+sc] = score;
    console.log();
    User.update({name: req.session.user} ,obj1,  function(err, found_user){
        if(err){
          console.log(err);
          res.send(err);
        }else{

              console.log(found_user);
              res.redirect('/users/dashboard');
            }
          });
          //res.redirect('/users/dashboard');
      }
  });
});

router.get('/', function(req,res,next){
  quiz.find({},function(err , quizes){
    if(err){
      console.log(err);
      res.send(err);
    }else{
      res.send(quizes);
    }
  });
});
router.get('/quizboot',function(req,res,next){
  res.render('quiz');
});

module.exports = router;
