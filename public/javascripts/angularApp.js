angular.module('movieograph').config(
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'MainController',
            controllerAs: 'vm',
            resolve: {
                // postPromise: ['posts', function(posts) {
                //     return posts.getAll();
                // }],
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
                    console.log("in user");
                    if(auth.isLoggedIn()){
                        return users.get(auth.currentUserId())
                    }
                    return "";
                }]
            }
        }).state('discover', {
            url: '/discover/{id}',
            templateUrl: '/discover.html',
            controller: 'DiscoverController',
            controllerAs: 'vm',
            resolve: {
                movies: ['$stateParams', 'movies', function($stateParams, movies) {
                    console.log(movies.discover());
                    return movies.discover();
                    // return movies.discover($stateParams.id);
                }]
            }
        }).state('search', {
            url: '/search/{id}',
            templateUrl: '/search.html',
            controller: 'DiscoverController',
            controllerAs: 'vm',
            resolve: {
                movies: ['$stateParams', 'movies', function($stateParams, movies) {
                    console.log("resolve");
                    return movies.getSearch($stateParams.id);
                    // return movies.discover($stateParams.id);
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
