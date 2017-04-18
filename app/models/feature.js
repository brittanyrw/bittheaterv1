var mongoose = require('mongoose');

var featureSchema = mongoose.Schema({

        userid        : String,
        published     : {type: Date, default: Date.now},
        featureTitle   	  : String,
        featureContent 	  : String,
        review        : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
        featureCity          : String,
        featureGenre         : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
        private       : Boolean
});

module.exports = mongoose.model('Feature', featureSchema);