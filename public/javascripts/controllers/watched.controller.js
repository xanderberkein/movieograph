angular.module('movieograph').controller('WatchedController',
    function(movies, user, users, auth) {


        var vm = this;
        vm.isLoggedIn = auth.isLoggedIn;
        vm.watched = user.watched;
        vm.removeFromWatched = removeFromWatched;
        vm.order = "title";

        function search(){
            $state.go('search', {id: vm.query});
        }

        function removeFromWatched(id){
            users.removeFromWatched(id).success(function(watched) {
                for (var key in vm.watched) {
                    if (vm.watched[key]._id === watched._id) {
                        vm.watched.splice(key, 1);
                        break;
                    }
                }
                var index = vm.watched.indexOf(watched);
                if (index > -1) {
                    vm.watched.splice(index, 1);
                }
            });
        }

    }
);
