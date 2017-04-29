var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({

       	userid        : String, //req.user._id
        published     : {type: Date, default: Date.now},
        reviewTitle   : String,
        reviewContent : String,
        show          : String,
        showCity      : String,
        showDate      : Date,
        genre         : String,
        theater       : String,
        rating        : Number,
        public        : String
});

// schema.pre('save', function(next) {
//     //round the rating down or up to either 4.0 or 4.5
//   this.ratingImage = 'imgs/'+this.rating+'.png';

//   next();
// });

module.exports = mongoose.model('Review', reviewSchema);