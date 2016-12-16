angular.module('movieograph').factory('users', function($http, auth) {
    var o = {
        users: [],
        get: get,
        addToWatchList: addToWatchList,
        removeFromWatchList: removeFromWatchList
    };


    function get(id) {
        return $http.get('/users/' + id).then(function(res) {
            return res.data;
        });
    };

    function addToWatchList(id) {
        return $http.post('/users/watchlist', id, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        });
    }

    function removeFromWatchList(id) {
        console.log("go");
        return $http.delete('/users/watchlist/' + id, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        });
    }

    return o;
});
