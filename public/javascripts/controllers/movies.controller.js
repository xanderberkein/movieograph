angular.module('movieograph').controller('MoviesController',
    function(users, movie, user, auth) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.addToWatchList = addToWatchList;
        vm.removeFromWatchList = removeFromWatchList;
        vm.addToWatched = addToWatched;
        vm.movie = movie;

        vm.user = user;

        if (vm.isLoggedIn()){
            vm.alreadyStarred = (user.watchList.indexOf(movie.id.toString()) != -1) ? true : false;
            vm.watched = [];
            var found = false;
            var watched = vm.user.watched;
            for(var i = 0; i < watched.length; i++) {
                if (watched[i].movieId == vm.movie.id) {
                    vm.watched.push(watched[i]);
                }
            }
        }

        function addToWatchList() {
            users.addToWatchList({
                movieid: vm.movie.id
            }).success(function() {
                vm.alreadyStarred = true;
            });
        };

        function removeFromWatchList() {
            users.removeFromWatchList(vm.movie.id).success(function(comment) {
                vm.alreadyStarred = false;
            });
        };

        function addToWatched(){
            users.addToWatched({
                movieId: vm.movie.id,
                title: vm.movie.title,
                releaseDate: vm.movie.release_date,
                watchedOn: vm.watchedOn,
                rating: vm.rating,
                note: vm.note
            }).success(function(data) {
                vm.watchedOn = vm.rating = vm.note = "";
                vm.watched.push(data);
            });
        }

    }
);
