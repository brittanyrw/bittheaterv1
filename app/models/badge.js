var mongoose = require('mongoose');

var badgeSchema = mongoose.Schema({

        title         : String,
        img           : String
});

module.exports = mongoose.model('Badge', badgeSchema);