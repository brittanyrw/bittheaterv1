var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({

       	reviewid	  : String,
       	userid        : String,
        published     : {type: Date, default: Date.now},
        reviewTitle   : String,
        reviewContent : String,
        show          : String,
        showCity      : String,
        theater       : String,
        rating        : Number,
        private       : Boolean
});

module.exports = mongoose.model('Review', reviewSchema);