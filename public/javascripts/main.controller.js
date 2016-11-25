angular.module('flapperNews').controller('MainController',
    function(posts, auth) {

        var vm = this;
        vm.isLoggedIn = auth.isLoggedIn;
        vm.posts = posts.posts;
        vm.addPost = addPost;
        vm.incrementUpvotes = incrementUpvotes;

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
