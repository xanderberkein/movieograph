angular.module('movieograph').controller('AuthController',
    function($state, auth) {
        var vm = this;

        vm.user = {};
        vm.register = register;
        vm.logIn = logIn;

        function register() {
            auth.register(vm.user)
            .catch(function(error) {
                vm.error = error.data;
                throw error;
            })
            .then(function() {
                $state.go('home');
            });
        };

        function logIn() {
            auth.logIn(vm.user)
            .catch(function(error) {
                vm.error = error.data;
                throw error;
            }).then(function(){
                $state.go('home');
            });
        };
    }
);
