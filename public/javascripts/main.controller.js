angular.module('movieograph').controller('MainController',
    function(movies, auth) {

        var vm = this;
        vm.isLoggedIn = auth.isLoggedIn;
        vm.movies = movies.discover;
        vm.watchList = movies.watchList;
        //vm.movies = movies.movies;
        // vm.addPost = addPost;
        // vm.incrementUpvotes = incrementUpvotes;

        console.log(vm.movies);


        // function addPost() {
        //     if (!vm.title || vm.title === '') {
        //         return;
        //     }
        //
        //     posts.create({
        //         title: vm.title,
        //         link: vm.link
        //     });
        //
        //     vm.title = '';
        //     vm.link = '';
        // };
        //
        // function incrementUpvotes(post) {
        //     posts.upvote(post);
        // };
    }
);
