angular.module('flapperNews').controller('MoviesController',
    function(posts, users, movie, user, auth) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.addToWatchList = addToWatchList;
        vm.removeFromWatchList = removeFromWatchList;
        vm.movie = movie;

        vm.user = user;
        console.log(user);

        vm.alreadyStarred = (user.watchList.indexOf(movie.id.toString()) != -1) ? true : false;
        vm.movie.budget += vm.movie.budget === '' ? 'Unknown' : '';
        vm.movie.revenue += vm.movie.revenue === '' ? 'Unknown' : '';

        console.log(vm.alreadyStarred);

        console.log(movie);



        function addToWatchList() {

            console.log("in addToW + " + vm.movie.id)

            users.addToWatchList({
                movieid: vm.movie.id
            }).success(function(comment) {
                vm.alreadyStarred = true;
            });

        };

        function removeFromWatchList() {

            console.log("in removeFro + " + vm.movie.id)

            users.removeFromWatchList(vm.movie.id).success(function(comment) {
                vm.alreadyStarred = false;
            });

        };

    }
);
