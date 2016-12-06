angular.module('flapperNews').controller('MainController',
    function(posts, movies, auth) {

        var vm = this;
        vm.isLoggedIn = auth.isLoggedIn;
        vm.posts = posts.posts;
        vm.movies = movies;
        //vm.movies = movies.movies;
        vm.addPost = addPost;
        vm.incrementUpvotes = incrementUpvotes;

        console.log(vm.movies);
        console.log(posts.posts)



        function addPost() {
            if (!vm.title || vm.title === '') {
                return;
            }

            posts.create({
                title: vm.title,
                link: vm.link
            });

            vm.title = '';
            vm.link = '';
        };

        function incrementUpvotes(post) {
            posts.upvote(post);
        };
    }
);
