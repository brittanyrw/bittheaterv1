var mongoose = require('mongoose');

var showlistSchema = mongoose.Schema({

        showid		  : String,
        userid        : String,
        published     : {type: Date, default: Date.now},
        title         : String,
        show          : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Show' }],
        type          : String,
        private       : Boolean
});

module.exports = mongoose.model('Showlist', showlistSchema);