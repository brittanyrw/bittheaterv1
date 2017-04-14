var mongoose = require('mongoose');

var badgesSchema = mongoose.Schema({

        id			  : String,
        title         : String,
        img           : String
});

module.exports = mongoose.model('Badges', badgesSchema);