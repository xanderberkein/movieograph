angular.module('movieograph').controller('DiscoverController',
    function(movies, auth, $state) {

        var vm = this;
        vm.isLoggedIn = auth.isLoggedIn;
        vm.movies = movies.results;
        vm.page = movies.page;
        vm.search = search;

        function search(){
            $state.go('search', {id: vm.query});
        }


    }
);
