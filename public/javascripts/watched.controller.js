angular.module('movieograph').controller('WatchedController',
    function(movies, user, users, auth) {


        var vm = this;
        vm.isLoggedIn = auth.isLoggedIn;
        vm.watched = user.watched;
        vm.removeFromWatched = removeFromWatched;
        vm.order = "title";

        console.log(vm.watched);

        function search(){
            console.log("xd");
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
                console.log(watched);
                var index = vm.watched.indexOf(watched);
                console.log(index);
                if (index > -1) {
                    vm.watched.splice(index, 1);
                }
                // vm.watched.pull(watched);
            });
        }

    }
);
