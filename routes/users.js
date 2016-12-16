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

// Get single user + their watchedMovies
// populate with watchedMovies
router.get('/:user/watched', function (req, res, next) {

    req.user.populate('watched', function (err, user) {
        if(err){
            return next(err);
        }

        res.json(user);

    });

    // return res.json(req.user);
});


// http://localhost:3000/users/watchlist
// movieid 259316
// Authorization Bearer {token}
// Post add to watchList
router.post('/watchlist', auth, function (req, res, next) {

    var movieid = req.body.movieid;

    var userid = req.payload._id;

    var query = User.findById(userid);

    query.exec(function(err, user){
        if(err){
            return next(err);
        }

        if(!user){
            return next(new Error('User not found'))
        }
            user.watchList.push(movieid);
            user.save(function(err){
                if(err){
                    return next(err);
                }

                res.json(user);
            })

        }
    );

});

router.delete('/watchlist/:id', auth, function (req, res, next) {
    console.log("test");

    var movieid = req.params.id;
    var userid = req.payload._id;
    var query = User.findById(userid);

    query.exec(function(err, user){
        if(err){
            return next(err);
        }

        if(!user){
            return next(new Error('User not found'))
        }

        var index = user.watchList.indexOf(movieid);
        console.log('index = ' + index + ', movieide = ' + movieid);
        if (index > -1) {
            user.watchList.splice(index, 1);
        }

        user.save(function(err, user) {
            if (err) {
                return next(err);
            }

            res.json(user);
        })

    });

});



module.exports = router;
