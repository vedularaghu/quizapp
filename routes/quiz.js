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
        }
      }
      User.findOne({name: req.session.user} , function(err, found_user){
        if(err){
          console.log(err);
          res.send(err);
        }else{
          found_user.scores[obj.cid+'_'+obj.qid] = score;
          found_user.save(function(err , new_users){
            if(err){
              console.log(err);
              res.send(err);
            }else {
              console.log("Second");
              console.log(new_users);
              res.redirect('/users/dashboard');
            }
          });
        }
      });
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
