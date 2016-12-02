var mongoose = require('mongoose');

var ActivitySchema = new mongoose.Schema({
    movieId: String,
    date: Date,
    content: String,
    icon: String
});

mongoose.model('Activity', ActivitySchema);
