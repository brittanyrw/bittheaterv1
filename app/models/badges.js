var mongoose = require('mongoose');

var badgesSchema = mongoose.Schema({

        title         : String,
        img           : String
});

module.exports = mongoose.model('Badges', badgesSchema);