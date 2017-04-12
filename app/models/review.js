var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({

        id            : String,
        userid        : String,
        published     : {type: Date, default: Date.now},
        reviewTitle   : String,
        reviewContent : String,
        showid        : String,
        city          : String,
        theater       : String,
        rating        : Number,
        privacy       : Boolean
});

module.exports = mongoose.model('Review', reviewSchema);