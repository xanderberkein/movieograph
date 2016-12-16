angular.module('movieograph').controller('NavController',
    function(movies, auth, $state) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.currentUser = auth.currentUser;
        vm.logOut = auth.logOut;
        vm.search = search;

        function search(){
            $state.go('search', {id: vm.query});
        }

    }
);
