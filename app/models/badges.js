var mongoose = require('mongoose');

var badgesSchema = mongoose.Schema({

        title         : String,
        img           : String,
        type		  : String,
        number		  : Number,
});

module.exports = mongoose.model('Badges', badgesSchema);