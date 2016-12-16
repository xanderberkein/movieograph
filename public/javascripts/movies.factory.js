angular.module('movieograph').factory('movies', function($http, auth) {

    var o = {
        movies: [],
        // posts: [],
        //getAll: getAll,
        discover: discover,
        // getWatchList: getWatchList,
        create: create,
        upvote: upvote,
        get: get,
        addComment: addComment,
        upvoteComment: upvoteComment
    };

    function discover(userid) {
        // var array = [346672, 259316, 297761];
        var into = [];
        var c = {
            discover: "",
            watchList: ""
        }
        return $http.jsonp('https://api.themoviedb.org/3/discover/movie?api_key=7a80f3ccc9d8fde85933817aca0e6092&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&callback=JSON_CALLBACK')
            .then(function(res) {
                c.discover = res.data.results;
                $http.get('/users/' + userid)
                    .then(function(res2) {
                        var array = res2.data.watchList;
                        array.forEach(function(id, i){
                            $http.jsonp('https://api.themoviedb.org/3/movie/' + id + '?api_key=7a80f3ccc9d8fde85933817aca0e6092&language=en-US&callback=JSON_CALLBACK')
                                .then(function(res3) {
                                    into[i] = res3.data
                                })
                        })
                    })
            })
            .then(function() {
                    c.watchList =  into;
                    console.log(c);
                    return c;

                // console.log("in discover");
                // var test = $http.jsonp('https://api.themoviedb.org/3/discover/movie?api_key=7a80f3ccc9d8fde85933817aca0e6092&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&callback=JSON_CALLBACK');
                // var c = {
                //     discover: res.data.results,
                //     watchList: test
                // }
                // console.log(c);
                // return c;
        });

    };

    function get(id) {
        return $http.jsonp('https://api.themoviedb.org/3/movie/' + id + '?api_key=7a80f3ccc9d8fde85933817aca0e6092&language=en-US&append_to_response=credits&callback=JSON_CALLBACK')
            .then(function(res) {
                return res.data;
        });
    };

    // function getWatchList(userid) {
    //     console.log("in getWatchList");
    //     return $http.get('/users/' + id).then(function(res) {
    //             console.log("wtf");
    //             var xd = "getwatchlist from" + userid;
    //             console.log(xd);
    //             return xd;
    //         });
    // };

    // function addToWatchList(userid) {
    //     return $http.post('/users/' + watchlist, {
    //         headers: {Authorization: 'Bearer ' + auth.getToken()}
    //     });
    // }

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
