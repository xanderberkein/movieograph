angular.module('movieograph').factory('auth', function($http, $window) {
    var auth = {
        saveToken: saveToken,
        getToken: getToken,
        isLoggedIn: isLoggedIn,
        currentUser: currentUser,
        currentUserId: currentUserId,
        register: register,
        logIn: logIn,
        logOut: logOut
    };

    function saveToken(token) {
        $window.localStorage['movieograph-token'] = token;
    }

    function getToken() {
        return $window.localStorage['movieograph-token'];
    };

    function isLoggedIn() {
        var token = auth.getToken();

        if (token) {
            var payload = angular.fromJson($window.atob(token.split('.')[1]));

            return payload.exp > Date.now() / 1000;
        }

        return false;
    };

    function currentUser() {
        if (auth.isLoggedIn()) {
            var token = auth.getToken();
            var payload = angular.fromJson($window.atob(token.split('.')[1]));

            return payload.username;
        }
    };

    function currentUserId() {
        console.log("currentuserid auth.factory")
        if (auth.isLoggedIn()) {
            var token = auth.getToken();
            var payload = angular.fromJson($window.atob(token.split('.')[1]));

            return payload._id;
        }
    };

    function register(user) {
        // // create guest account on tmdb for watchlist
        // return $http.jsonp('https://api.themoviedb.org/3/authentication/guest_session/new?api_key=7a80f3ccc9d8fde85933817aca0e6092&callback=JSON_CALLBACK')
        //     .then(function(res) {
        //         // create guest account on tmdb for watchedlist
        //         return $http.jsonp('https://api.themoviedb.org/3/authentication/guest_session/new?api_key=7a80f3ccc9d8fde85933817aca0e6092&callback=JSON_CALLBACK')
        //             .then(function(res2) {
        //                 user.watchListId = res.data.guest_session_id;
        //                 user.watchedId = res2.data.guest_session_id;
        //                 // create account on own api
        //                 return $http.post('/register', user).then(function(data) {
        //                     auth.saveToken(data.data.token);
        //                 });
        //         });
        // });
        return $http.post("/register", user).success(function(data) {
          auth.saveToken(data.token);
        });
    };

    function logIn(user) {
        return $http.post('/login', user).success(function(data) {
            auth.saveToken(data.token);
        });
    };

    function logOut() {
        $window.localStorage.removeItem('movieograph-token');
    };

    return auth;
});
