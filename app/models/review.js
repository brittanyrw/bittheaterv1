var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({

       	userid        : String, //req.user._id
        published     : {type: Date, default: Date.now},
        reviewTitle   : String,
        reviewContent : String,
        show          : String,
        showCity      : String,
        genre         : String,
        theater       : String,
        rating        : Number,
        private       : Boolean
});

module.exports = mongoose.model('Review', reviewSchema);