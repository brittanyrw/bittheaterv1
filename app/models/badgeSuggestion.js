var mongoose = require('mongoose');

var badgeSuggestionSchema = mongoose.Schema({

        name         : String,
        suggestion   : String
});

module.exports = mongoose.model('BadgeSuggestion', badgeSuggestionSchema);