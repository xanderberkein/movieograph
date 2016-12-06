var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

var jwt = require('express-jwt');
var auth = jwt({
    secret: 'SECRET',
    userProperty: 'payload'
});


router.param('user', function(req, res, next, id){
    var query = User.findById(id, {'hash': 0, 'salt': 0});

    query.exec(function(err, user){
        if(err){
            return next(err);
        }

        if(!user){
            return next(new Error('cant find user'))
        }

        req.user = user;

        return next();
    });
});

// Get all users
router.get('/', function (req, res, next) {
    User.find({}, {'hash': 0, 'salt': 0}, function (err, users) {
        if (err) {
            return next(err);
        }

        res.json(users);
    });
});

// Get single user
router.get('/:user', function (req, res, next) {
    return res.json(req.user);
});



module.exports = router;
