angular.module('flapperNews').controller('PostsController',
    function(posts, post, auth) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.post = post;
        vm.addComment = addComment;
        vm.incrementUpvotes = incrementUpvotes;

        function addComment() {
            if (vm.body === '') {
                return;
            }

            posts.addComment(post._id, {
                body: vm.body,
                author: 'user'
            }).success(function(comment) {
                vm.post.comments.push(comment);
            });

            vm.body = '';
        };

        function incrementUpvotes(comment) {
            posts.upvoteComment(post, comment);
        };
    }
);
