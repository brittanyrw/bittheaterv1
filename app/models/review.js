var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({

       	userId        : String, //req.user._id
        published     : {type: Date, default: Date.now},
        reviewTitle   : String,
        reviewContent : String,
        showId        : String,
        showDate      : Date,
        rating        : Number,
        ratingImg     : String,
        public        : String
});

reviewSchema.pre('save', function(next) {
  this.ratingImg = 'imgs/'+this.rating+'.png';
  next();
});

module.exports = mongoose.model('Review', reviewSchema);