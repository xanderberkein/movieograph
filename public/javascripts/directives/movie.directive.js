angular.module('movieograph').directive('movieCard',
    function() {
        return {
            restrict: 'E',
            transclude: false,
            templateUrl: 'javascripts/directives/movie-card.html'
        }
    }
);
