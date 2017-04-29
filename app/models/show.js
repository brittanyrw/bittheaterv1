var mongoose = require('mongoose');

var showSchema = mongoose.Schema({

      	created       : {type: Date, default: Date.now},
        showTitle     : String,
        showType      : String,
        genre         : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
        city          : String,
        theater       : String,
        reviews       : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

module.exports = mongoose.model('Show', showSchema);