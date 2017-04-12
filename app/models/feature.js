var mongoose = require('mongoose');

var featureSchema = mongoose.Schema({

        userid        : String,
        published     : {type: Date, default: Date.now},
        title   	  : String,
        content 	  : String,
        reviews       : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
        city          : String,
        genres        : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
        private       : Boolean
});

module.exports = mongoose.model('Feature', featureSchema);