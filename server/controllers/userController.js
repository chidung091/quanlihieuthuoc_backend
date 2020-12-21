'use strict';

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcryptjs'),
  User = mongoose.model('User'),
  Userinfo = mongoose.model('Userinfo');
exports.register = function(req, res) {
    var newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
      if (err) {
        return res.status(400).send({
          message: err
        });
      } else {
        user.hash_password = undefined;
        return res.json(user);
      }
    });
};

exports.sign_in = function(req, res) {
    User.findOne({
        email: req.body.email
      }, function(err, user) {
        if (err) throw err;
        if (!user) {
          res.status(401).json({ message: 'Authentication failed. User not found.' });
        } else if (user) {
          if (!user.comparePassword(req.body.password)) {
            res.status(401).json({ message: 'Authentication failed. Wrong password.' });
          } else {
            const user2 = {
              email: user.email, 
              fullName: user.fullName, 
              _id: user._id
            }
            const tokenn = jwt.sign({user2}, 'RESTFULAPIs',{expiresIn: '300d'});
            return res.status(200).json({
              id: user._id,
              token: tokenn,
            })
          }
        }
      });
};
exports.registerUser = function(req,res){
  const newUser = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    role: req.body.role,
  });
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);

  newUser.save().then((user)=>{
      const na = user.fullName;
      const newInfo = new Userinfo({
        _id: user._id,
        fullName: na,
        ngaysinh: req.body.ngaysinh,
        salary: req.body.salary,
        sodienthoai: req.body.sodienthoai,
        quequan: req.body.quequan,
      });
      const em = user.email;
      newInfo.save().then((user2)=>{
          const use3r = {
            email: em,
            fullName: user2.fullName,
            salary: user2.salary,
            sodienthoai: user2.sodienthoai,
            quequan: user2.quequan,
          }
          return res.status(200).json(use3r);
        }).catch(err2 => {
          return res.status(400).send({
            message: err2
          });
        });
    }).catch(error =>{
      return res.status(400).send({
        message: error
      });
    });
};
exports.loginRequired = function(req, res, next) {
    if (req.user) {
        next();
      } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
      }
};