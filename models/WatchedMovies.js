var mongoose = require('mongoose');

var WatchedMovieSchema = new mongoose.Schema({
    movieId: String,
    watchedOn: Date,
    rating: Number,
    note: String
});

mongoose.model('WatchedMovie', WatchedMovieSchema);
