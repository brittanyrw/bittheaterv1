var mongoose = require('mongoose');

var showlistSchema = mongoose.Schema({

        userid        : String,
        published     : {type: Date, default: Date.now},
        title         : String,
        showid        : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Show' }],
        type          : String,
        private       : Boolean
});

module.exports = mongoose.model('Showlist', showlistSchema);