angular.module('movieograph').factory('users', function($http, auth) {
    var o = {
        users: [],
        get: get,
        getWatched: getWatched,
        addToWatchList: addToWatchList,
        removeFromWatchList: removeFromWatchList,
        addToWatched: addToWatched
    };


    function get(id) {
        return $http.get('/users/' + id).then(function(res) {
            return res.data;
        });
    };

    function getWatched(id) {
        return $http.get('/users/' + id + '/watched').then(function(res) {
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

    function addToWatched(watched){
        return $http.post('/watched/', watched, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function(data){
            return data;
        });
    }

    return o;
});
