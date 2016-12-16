angular.module('movieograph').controller('NavController',
    function(movies, auth, $state) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.currentUser = auth.currentUser;
        vm.logOut = logOut;
        vm.search = search;

        function logOut() {
            auth.logOut();
            $state.go('home');
        }

        function search(){
            $state.go('search', {id: vm.query});
        }

    }
);
