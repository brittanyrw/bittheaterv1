var mongoose = require('mongoose');

var featureSchema = mongoose.Schema({

        userid        : String,
        published     : {type: Date, default: Date.now},
        featureTitle   	  : String,
        featureSubTitle	  : String,
        featureContent 	  : String,
        review        : [String],
        featureCity          : String,
        featureGenre         : [String],
        public       : String
});

module.exports = mongoose.model('Feature', featureSchema);