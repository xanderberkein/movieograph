var mongoose = require('mongoose');

var WatchedMovieSchema = new mongoose.Schema({
    movieId: String,
    title: String,
    releaseDate: Date,
    watchedOn: Date,
    rating: Number,
    note: String
});

mongoose.model('WatchedMovie', WatchedMovieSchema);
