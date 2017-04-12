var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({

        userid        : String,
        published     : {type: Date, default: Date.now},
        title         : String,
        content       : String,
        showid        : String,
        city          : String,
        theater       : String,
        rating        : Number,
        private       : Boolean
});

module.exports = mongoose.model('Review', reviewSchema);