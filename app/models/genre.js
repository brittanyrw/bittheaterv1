var mongoose = require('mongoose');

var genreSchema = mongoose.Schema({

        title         	: { type : String , unique : true, required : true, dropDups: true }, 
        slug			: { type : String , unique : true, required : true, dropDups: true }
});

module.exports = mongoose.model('Genre', genreSchema);