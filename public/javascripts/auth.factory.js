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
