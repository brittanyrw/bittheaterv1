var mongoose = require('mongoose');

var showlistSchema = mongoose.Schema({

        userid        : String,
        published     : {type: Date, default: Date.now},
        showListTitle : String,
        showListDescription : String,
        show          : {
        	showTitle: String,
        	showLocation: String,
        	showDate : Date,
        	showNotes: String,		
        },
        showListType  : String,
        private       : String
});

module.exports = mongoose.model('Showlist', showlistSchema);