var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


// models
var User = mongoose.model('User');

var passport = require('passport');

// routes

// Register
router.post('/register', function(req, res, next) {
    console.log("in register")
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    console.log("username en password gecheckt");

    var user = new User();
    user.username = req.body.username;
    user.setPassword(req.body.password);
    // user.watchListId = req.body.watchListId;
    // user.watchedId = req.body.watchedId;

    console.log(user);

    console.log("na user.setPw");

    user.save(function(err) {
        if (err) {
            // return next(err);
            return res.status(400).json({message: 'A user with this username already exists.'});
        }

        return res.json({token: user.generateJWT()})
    });
});


// Login
router.post('/login', function(req, res, next) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }

        if (user) {
            return res.json({
                token: user.generateJWT()
            });
        } else {
            return res.status(401).json(info);
        }
    })(req, res, next);
});

module.exports = router;
