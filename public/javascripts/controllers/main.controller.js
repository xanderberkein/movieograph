angular.module('movieograph').controller('MainController',
    function(movies, auth) {

        var vm = this;
        vm.isLoggedIn = auth.isLoggedIn;
        vm.movies = movies.discover;
        vm.watchList = movies.watchList;

    }
);
