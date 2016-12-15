angular.module('flapperNews').config(
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'MainController',
            controllerAs: 'vm',
            resolve: {
                postPromise: ['posts', function(posts) {
                    console.log("post promoise 1")
                    return posts.getAll();
                }],
                movies: ['movies', function(movies){
                    console.log("post promoise 2")
                    return movies.discover();
                }],
                watchList: ['movies', 'auth', function(movies, auth){
                    console.log("post promise 3");
                    console.log(auth.currentUserId());
                    return movies.getWatchList(auth.currentUserId());
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
                }]
            }
        }).state('posts', {
            url: '/posts/{id}',
            templateUrl: '/posts.html',
            controller: 'PostsController',
            controllerAs: 'vm',
            resolve: {
                post: ['$stateParams', 'posts', function($stateParams, posts) {
                    return posts.get($stateParams.id);
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
