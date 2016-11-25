var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('express-jwt');

// models
var WatchedMovie = mongoose.model('WatchedMovie');

// middlewares
var auth = jwt({
  secret: 'SECRET',
  userProperty: 'payload'
});

// params
router.param('watched', function(req, res, next, id) {
  var query = WatchedMovie.findById(id);

  query.exec(function(err, watchedMovie) {
    if (err) {
      return next(err);
    }

    if ( ! watchedMovie) {
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


// get1
router.get('/:watched', function(req, res, next) {

    res.json(req.watchedMovie);

});


// create new
//router.post('/', auth, function (req, res, next) {
router.post('/', function (req, res, next) {

    var watchedMovie = new WatchedMovie(req.body);

    // post.author = req.payload.username;

    watchedMovie.save(function (err, watchedMovie) {
        if (err) {
            return next(err);
        }

        res.json(watchedMovie);
    });
});

module.exports = router;
