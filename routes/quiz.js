var express = require('express');
var router = express.Router();
var quiz = require('../models/quiz');


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
  console.log("Received");
  quiz.find({cid: req.params.cid , qid: req.params.qid},function(err , quizes){
    if(err){
      console.log(err);
      res.send(err);
    }else{
      res.send(quizes);
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

module.exports = router;
