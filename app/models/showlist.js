var mongoose = require('mongoose');

var showlistSchema = mongoose.Schema({

        userid        : String,
        published     : {type: Date, default: Date.now},
        showListTitle : String,
        show          : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Show' }],
        showListType  : String,
        private       : Boolean
});

module.exports = mongoose.model('Showlist', showlistSchema);