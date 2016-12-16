angular.module('movieograph').controller('MoviesController',
    function(posts, users, movie, user, auth) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.addToWatchList = addToWatchList;
        vm.removeFromWatchList = removeFromWatchList;
        vm.movie = movie;

        vm.user = user;

        if (vm.isLoggedIn()){
            vm.alreadyStarred = (user.watchList.indexOf(movie.id.toString()) != -1) ? true : false;
        }
        vm.movie.budget += vm.movie.budget === '' ? 'Unknown' : '';
        vm.movie.revenue += vm.movie.revenue === '' ? 'Unknown' : '';


        console.log(movie);



        function addToWatchList() {

            users.addToWatchList({
                movieid: vm.movie.id
            }).success(function(comment) {
                vm.alreadyStarred = true;
            });

        };

        function removeFromWatchList() {

            users.removeFromWatchList(vm.movie.id).success(function(comment) {
                vm.alreadyStarred = false;
            });

        };

    }
);
