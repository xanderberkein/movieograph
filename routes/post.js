var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('express-jwt');

// models
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');

// middlewares
var auth = jwt({
    secret: 'SECRET',
    userProperty: 'payload'
});


// params
// Map logic to route parameter 'post'
router.param('post', function(req, res, next, id){
    var query = Post.findById(id);

    query.exec(function(err, post){
        if(err){
            return next(err);
        }

        if(!post){
            return next(new Error('cant find post'))
        }

        req.post = post;

        return next();
    });
});


//routes

// Get all posts
router.get('/', function (req, res, next) {
    Post.find(function (err, posts) {
        if (err) {
            return next(err);
        }

        res.json(posts);
    });
});


// Create new post
router.post('/', auth, function (req, res, next) {
    var post = new Post(req.body);
    post.author = req.payload.username;

    post.save(function (err, post) {
        if (err) {
            return next(err);
        }

        res.json(post);
    });
});


// Get single post
router.get('/:post', function (req, res, next) {
    req.post.populate('comments', function (err, post) {
        if (err) {
            return next(err);
        }

        res.json(req.post);
    });
});


// Upvote post
router.put('/:post/upvote', auth, function (req, res, next) {
    req.post.upvote(function (err, post) {
        if (err) {
            return next(err);
        }

        res.json(post);
    });
});


// Post comment
router.post('/:post/comments', auth, function (req, res, next) {
    var comment = new Comment(req.body);
    comment.post = req.post;
    comment.author = req.payload.username;

    comment.save(function (err, comment) {
        if (err) {
            return next(err);
        }

        req.post.comments.push(comment);
        req.post.save(function (err, post) {
            if (err) {
                return next(err);
            }

            res.json(comment);
        });
    });
});


router.param('comment', function (req, res, next, id) {
    var query = Comment.findById(id);

    query.exec(function (err, comment) {
        if (err) { return next(err); }
        if (!comment) {
            return next(new Error('cant find comment'));
        }

        req.comment = comment;
        return next();
    });
});


// Upvote comment
router.put('/:post/comments/:comment/upvote', auth, function (req, res, next) {
    req.comment.upvote(function (err, comment) {
        if (err) { return next(err); }

        res.json(comment);
    });
});


module.exports = router;
