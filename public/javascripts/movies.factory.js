angular.module('flapperNews').factory('movies', function($http, auth) {

    var o = {
        movies: [],
        // posts: [],
        //getAll: getAll,
        discover: discover,
        create: create,
        upvote: upvote,
        get: get,
        addComment: addComment,
        upvoteComment: upvoteComment
    };

    function discover() {
        return $http.jsonp('https://api.themoviedb.org/3/discover/movie?api_key=7a80f3ccc9d8fde85933817aca0e6092&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&callback=JSON_CALLBACK')
            .then(function(res) {
                console.log(res.data.results);
                return res.data.results;
        });
        // console.log("in discover");
        // var settings = {
        //   "async": true,
        //   "crossDomain": true,
        //   "url": "https://api.themoviedb.org/3/discover/movie?page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=7a80f3ccc9d8fde85933817aca0e6092",
        //   "method": "GET",
        //   "headers": {},
        //   "data": "{}"
        // }
        //
        // $.ajax(settings).done(function (response) {
        //   console.log(response.results);
        //   return response.results;
        // });
    };

    // function getAll() {
    //     return $http.get('/posts').success(function(data) {
    //         angular.copy(data, o.posts);
    //     });
    // };

    function create(post) {
        return $http.post('/posts', post, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function(data) {
            o.posts.push(data);
        });
    };

    function upvote(post) {
        return $http.put('/posts/' + post._id + '/upvote', null, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function() {
            post.upvotes += 1;
        });
    };

    function get(id) {
        return $http.get('/posts/' + id).then(function(res) {
            return res.data;
        });
    };

    function addComment(id, comment) {
        return $http.post('/posts/' + id + '/comments', comment, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        });
    };

    function upvoteComment(post, comment) {
        return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function() {
            comment.upvotes += 1;
        });
    };

    return o;
});
