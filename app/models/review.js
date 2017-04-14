var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({

       	reviewid	  : String,
       	userid        : String,
        published     : {type: Date, default: Date.now},
        title         : String,
        content       : String,
        show          : String,
        city          : String,
        theater       : String,
        rating        : Number,
        private       : Boolean
});

module.exports = mongoose.model('Review', reviewSchema);