angular.module('flapperNews').factory('auth', function($http, $window) {
    var auth = {
        saveToken: saveToken,
        getToken: getToken,
        isLoggedIn: isLoggedIn,
        currentUser: currentUser,
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

    function register(user) {
        return $http.post('/register', user).success(function(data) {
            auth.saveToken(data.token);
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
