angular.module('flapperNews').config(
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'MainController',
            controllerAs: 'vm',
            resolve: {
                postPromise: ['posts', function(posts) {
                    return posts.getAll();
                }],
                movies: ['movies', 'auth', function(movies, auth){
                    return movies.discover(auth.currentUserId());
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
                    console.log("in user");
                    if(auth.isLoggedIn()){
                        return users.get(auth.currentUserId())
                    }
                    return "";
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
