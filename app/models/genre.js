var mongoose = require('mongoose');

var genreSchema = mongoose.Schema({

        genreid			  : String,
        title         : String
});

module.exports = mongoose.model('Genre', genreSchema);