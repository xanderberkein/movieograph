var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('express-jwt');

// models
var WatchedMovie = mongoose.model('WatchedMovie');
var User = mongoose.model('User');

// middlewares
var auth = jwt({
  secret: 'SECRET',
  userProperty: 'payload'
});


router.param('user', function(req, res, next, id) {
    var query = User.findById(id);

    query.exec(function(err, user) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return next(new Error('can\'t find user'));
        }

        req.user = user;

        return next();
    });
});

// params
router.param('watched', function(req, res, next, id) {
  var query = WatchedMovie.findById(id);

  query.exec(function(err, watchedMovie) {
    if (err) {
      return next(err);
    }

    if (!watchedMovie) {
      return next(new Error('can\'t find movie'));
    }

    req.watchedMovie = watchedMovie;

    return next();
  });
});


// routes

// getAll
router.get('/', function(req, res, next) {

  WatchedMovie.find(function(err, watchedMovies) {
    if (err) {
      return next(err);
    }

    res.json(watchedMovies)
  });

});

// get All 4 1 user
router.get('/user/:user', function(req, res, next) {

    req.user.populate('watched', function (err, user) {
        if(err){
            return next(err);
        }

        res.json(user.watched);

    });

});


// get: api/watched/watchedMovieId
router.get('/:watched', function(req, res, next) {

    res.json(req.watchedMovie);

});


// create new
// post: api/watched
router.post('/', auth, function (req, res, next) {

    console.log("in watched");

    var body = req.body;
    console.log("req.body");
    if (!body.watchedOn || !body.rating) {
        return res.status(400).json({message: 'Please fill in the date and rating'});
    }

    console.log(req.body);

    var watchedMovie = new WatchedMovie(req.body);
    var userid = req.payload._id;

    var query = User.findById(userid);

    query.exec(function(err, user){
        if(err){
            return next(err);
        }

        if(!user){
            return next(new Error('User not found'))
        }

        console.log("found user");

        watchedMovie.save(function (err, watchedMovie) {
            if (err) {
                return next(err);
            }

            user.watched.push(watchedMovie);
            user.save(function(err){
                if(err){
                    return next(err);
                }
            })

            res.json(watchedMovie);
        });

    });


});


// Edit watchedMovie
//router.put('/:watched/', auth, function (req, res, next) {
router.put('/:watched/', function (req, res, next) {

    var watchedMovie = req.watchedMovie;
    var body = req.body;

    if (!body.watchedOn) {
        return res.status(400).json({message: 'Gelieve de bekijkdatum in te vullen'});
    }

    watchedMovie.watchedOn = body.watchedOn;
    watchedMovie.rating = body.rating;
    watchedMovie.note = body.note;

    menu.save(function(err, watchedMovie) {
        if (err) {
            return next(err);
        }

        res.json(watchedMovie);
    });
});

module.exports = router;
