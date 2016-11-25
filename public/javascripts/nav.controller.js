angular.module('flapperNews').controller('NavController',
    function(auth) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.currentUser = auth.currentUser;
        vm.logOut = auth.logOut;
    }
);
