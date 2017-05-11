var mongoose = require('mongoose');

var showlistSchema = mongoose.Schema({

        userId        : String,
        published     : {type: Date, default: Date.now},
        showListTitle : String,
        showListDescription : String,
        shows  : [{ 
                showId : String,
                showDate : Date,
                showNotes : String,
        }],
        showListType  : String,
        public       : String
});

module.exports = mongoose.model('Showlist', showlistSchema);