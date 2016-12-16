angular.module('movieograph').factory('movies', function($http, auth) {

    var o = {
        movies: [],
        getMainPage: getMainPage,
        discover: discover,
        getSearch: getSearch,
        get: get
    };

    /*
        getMainPage(userid)
        1. get most popular movies (discover)
        2. get watchList of user
        3. populate watchList with moviedetails 1 by 1
        4. put everything in 1 object and return
    */
    function getMainPage(userid) {
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
                c.watchList = into;
                return c;
        });

    };

    function discover(page){
        return $http.jsonp('https://api.themoviedb.org/3/discover/movie?api_key=7a80f3ccc9d8fde85933817aca0e6092&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + page + '&callback=JSON_CALLBACK')
            .then(function(res) {
                return res.data;
        })
    }

    function get(id) {
        return $http.jsonp('https://api.themoviedb.org/3/movie/' + id + '?api_key=7a80f3ccc9d8fde85933817aca0e6092&language=en-US&append_to_response=credits&callback=JSON_CALLBACK')
            .then(function(res) {
                return res.data;
        });
    };

    function getSearch(query){
        return $http.jsonp('https://api.themoviedb.org/3/search/movie?api_key=7a80f3ccc9d8fde85933817aca0e6092&language=en-US&query=' + query + '&page=1&include_adult=false&callback=JSON_CALLBACK')
            .then(function(res) {
                return res.data;
        });
    }

    return o;
});
