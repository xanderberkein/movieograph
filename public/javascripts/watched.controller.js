angular.module('movieograph').controller('WatchedController',
    function(movies, user, auth) {


        var vm = this;
        vm.isLoggedIn = auth.isLoggedIn;
        vm.watched = user.watched;
        vm.order = "title";

        console.log(vm.watched);

        function search(){
            console.log("xd");
            $state.go('search', {id: vm.query});
        }

    }
);
