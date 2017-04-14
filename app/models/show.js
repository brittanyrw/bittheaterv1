var mongoose = require('mongoose');

var showSchema = mongoose.Schema({

        showid		  : String,
      	created       : {type: Date, default: Date.now},
        title         : String,
        type          : String,
        genre         : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
        city          : String,
        theater       : String,
        reviews       : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

module.exports = mongoose.model('Show', showSchema);