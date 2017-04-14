var mongoose = require('mongoose');

var badgesSchema = mongoose.Schema({

        badgeid		  : Number,
        title         : String,
        img           : String
});

module.exports = mongoose.model('Badges', badgesSchema);