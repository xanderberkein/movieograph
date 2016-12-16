angular.module('movieograph').config(
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'MainController',
            controllerAs: 'vm',
            resolve: {
                movies: ['movies', 'auth', function(movies, auth){
                    return movies.getMainPage(auth.currentUserId());
                }]
            }
        }).state('movie', {
            url: '/movie/{id}',
            templateUrl: '/movie.html',
            controller: 'MoviesController',
            controllerAs: 'vm',
            resolve: {
                movie: ['$stateParams', 'movies', function($stateParams, movies) {
                    return movies.get($stateParams.id);
                }],
                user: ['users', 'auth', function(users, auth) {
                    if(auth.isLoggedIn()){
                        return users.getWatched(auth.currentUserId())
                    }
                    return "";
                }]
            }
        }).state('discover', {
            url: '/discover/{page}',
            templateUrl: '/discover.html',
            controller: 'DiscoverController',
            controllerAs: 'vm',
            resolve: {
                movies: ['$stateParams', 'movies', function($stateParams, movies) {
                    return movies.discover($stateParams.page);
                }]
            }
        }).state('search', {
            url: '/search/{id}',
            templateUrl: '/search.html',
            controller: 'DiscoverController',
            controllerAs: 'vm',
            resolve: {
                movies: ['$stateParams', 'movies', function($stateParams, movies) {
                    return movies.getSearch($stateParams.id);
                }]
            }
        }).state('watched', {
            url: '/watched',
            templateUrl: '/watched.html',
            controller: 'WatchedController',
            controllerAs: 'vm',
            onEnter: ['$state', 'auth', function ($state, auth) {
                if (!auth.isLoggedIn()) {
                    $state.go('home');
                }
            }],
            resolve: {
                user: ['users', 'auth', function(users, auth) {
                    if(auth.isLoggedIn()){
                        return users.getWatched(auth.currentUserId())
                    }
                    return "";
                }]
            }
        }).state('login', {
            url: '/login',
            templateUrl: '/login.html',
            controller: 'AuthController',
            controllerAs: 'vm',
            onEnter: ['$state', 'auth', function($state, auth) {
                if (auth.isLoggedIn()) {
                    $state.go('home');
                }
            }]
        }).state('register', {
            url: '/register',
            templateUrl: '/register.html',
            controller: 'AuthController',
            controllerAs: 'vm',
            onEnter: ['$state', 'auth', function($state, auth) {
                if (auth.isLoggedIn()) {
                    $state.go('home');
                }
            }]
        });

        $urlRouterProvider.otherwise('home');
    }
);
