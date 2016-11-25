var mongoose = require('mongoose');

var WatchedMovieSchema = new mongoose.Schema({
    movie: String,
    watchedOn: Date,
    rating: Number,
    note: String
});

mongoose.model('WatchedMovie', WatchedMovieSchema);
