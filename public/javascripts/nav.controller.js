angular.module('movieograph').controller('NavController',
    function(movies, auth) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.currentUser = auth.currentUser;
        vm.logOut = auth.logOut;

        vm.searchMovie = searchMovie;

        function searchMovie() {
            var query = vm.query;

            if (!vm.query || vm.query === '') {
                return;
            }

            movies.getSearch(vm.query);

            vm.query = '';

            $state.go('', {id: restaurant._id});


            // posts.create({
            //     title: vm.title,
            //     link: vm.link
            // });
            //
            // vm.title = '';
            // vm.link = '';
        };

    }
);
