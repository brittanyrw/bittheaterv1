var mongoose = require('mongoose');

var showSchema = mongoose.Schema({

      	created       : {type: Date, default: Date.now},
        showTitle     : String,
        showType      : String,
        genre         : [String],
        showCity      : String,
        showTheater   : String,
        showCategory  : String
});

module.exports = mongoose.model('Show', showSchema);