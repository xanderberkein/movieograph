angular.module('flapperNews').factory('movies', function($http, auth) {

    var o = {
        movies: [],
        // posts: [],
        //getAll: getAll,
        discover: discover,
        getWatchList: getWatchList,
        create: create,
        upvote: upvote,
        get: get,
        addComment: addComment,
        upvoteComment: upvoteComment
    };

    function discover() {
        return $http.jsonp('https://api.themoviedb.org/3/discover/movie?api_key=7a80f3ccc9d8fde85933817aca0e6092&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&callback=JSON_CALLBACK')
            .then(function(res) {
                return res.data.results;
        });

    };

    function get(id) {
        return $http.jsonp('https://api.themoviedb.org/3/movie/' + id + '?api_key=7a80f3ccc9d8fde85933817aca0e6092&language=en-US&append_to_response=credits&callback=JSON_CALLBACK')
            .then(function(res) {
                console.log(res.data);
                return res.data;
        });
    };

    function getWatchList(userid) {
        return $http.jsonp('https://api.themoviedb.org/3/discover/movie?api_key=7a80f3ccc9d8fde85933817aca0e6092&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&callback=JSON_CALLBACK')
            .then(function(res) {
                console.log("wtf");
                var xd = "getwatchlist from" + userid;
                console.log(xd);
                return xd;
            });
    };

    // function get(id) {
    //     return $http.get('/posts/' + id).then(function(res) {
    //         return res.data;
    //     });
    // };

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
