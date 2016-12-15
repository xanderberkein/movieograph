angular.module('flapperNews').controller('MoviesController',
    function(posts, movie, auth) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.movie = movie;
        vm.addComment = addComment;
        vm.incrementUpvotes = incrementUpvotes;

        vm.movie.budget += vm.movie.budget === '' ? 'Unknown' : '';
        vm.movie.revenue += vm.movie.revenue === '' ? 'Unknown' : '';


        console.log(movie);

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
