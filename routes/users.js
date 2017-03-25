var express = require('express');
var router = express.Router();
var User = require('../models/users');
function authenticate(req,res,next){
  if(req.session && req.session.user){
    next();
  }else{
    res.redirect('/');
  }
}
/* GET users listing. */
router.post('/register',function(req,res,next){
  var newUser = new User({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  newUser.save(function(err,user){
    if(err){
      console.log(err);
      res.send(err);
    }else{
      res.send("Succesfully saved !");
    }
  });
});
router.post('/login',function(req,res,next){
  console.log(req.body);
  User.findOne({email: req.body.username},function(err, user){
    if(err){
      console.log(err);
      res.send(err);
    }else{
      if(user){
        console.log(user);
        if(user.password==req.body.password){
          req.session.user = user.name;
          console.log('Logged In');
          console.log(req.session);
          res.redirect('/users/dashboard');
        }else{
          res.send('Incorrect password');
        }
      }else{
        res.send("No user found");
      }
    }
  });
});
router.get('/logout',function(req,res,next){
  delete req.session.user;
  res.redirect('/');
});
router.get('/dashboard', authenticate, function(req,res,next){
  User.findOne({name:req.session.user},function(err , user){
    if(err){
      console.log(err);
      res.send(err);
    }else{
      res.render('dashboard',{users:user});
    }
  });
});
router.get('/dashboard2', authenticate, function(req,res,next){
  User.findOne({name:req.session.user},function(err , user){
    if(err){
      console.log(err);
      res.send(err);
    }else{
      console.log(user);
      res.render('dashboard2',{users:user});
    }
  });
});
router.get('/dashboard3',function(req,res,next){
  res.render('dashboard3');
});
router.get('/dashboard4',function(req,res,next){
  res.render('dashboard4');
});


module.exports = router;
