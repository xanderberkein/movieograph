angular.module('movieograph').controller('DiscoverController',
    function(movies, auth, $state) {


        var vm = this;
        vm.isLoggedIn = auth.isLoggedIn;
        vm.movies = movies.results;
        vm.page = movies.page;
        vm.search = search;

        console.log(vm.movies);

        function search(){
            console.log("xd");
            $state.go('search', {id: vm.query});
        }




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
