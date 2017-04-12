var mongoose = require('mongoose');

var genreSchema = mongoose.Schema({

        title         : String
});

module.exports = mongoose.model('Genre', genreSchema);