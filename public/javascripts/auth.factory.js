angular.module('flapperNews').factory('auth', function($http, $window) {
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
        $window.localStorage['flapper-news-token'] = token;
    }

    function getToken() {
        return $window.localStorage['flapper-news-token'];
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
        if (auth.isLoggedIn()) {
            var token = auth.getToken();
            var payload = angular.fromJson($window.atob(token.split('.')[1]));

            return payload._id;
        }
    };

    function register(user) {
        console.log(user);
        return $http.jsonp('https://api.themoviedb.org/3/authentication/guest_session/new?api_key=7a80f3ccc9d8fde85933817aca0e6092&callback=JSON_CALLBACK')
            .then(function(res) {
                console.log("vlakvoorpost" + res.data.guest_session_id);
                return $http.jsonp('https://api.themoviedb.org/3/authentication/guest_session/new?api_key=7a80f3ccc9d8fde85933817aca0e6092&callback=JSON_CALLBACK')
                    .then(function(res2) {
                        console.log(res.data);
                        console.log(user);
                        console.log(res2.data);
                        user.watchListId = res.data.guest_session_id;
                        user.watchedId = res2.data.guest_session_id;
                        console.log(user);
                        return $http.post('/register', user).then(function(data) {
                            console.log("na post");
                            console.log(data.data.token);
                            auth.saveToken(data.data.token);
                        },
                        function(error){
                            throw error;
                        });
                    },
            function(error){
                throw error;
            });
        }, function(error){
            throw error;
        });
    };

    function logIn(user) {
        return $http.post('/login', user).success(function(data) {
            auth.saveToken(data.token);
        });
    };

    function logOut() {
        $window.localStorage.removeItem('flapper-news-token');
    };

    return auth;
});
