// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    profile          : {
        location     : String,
        summary      : String,
        joinDate     : {type: Date, default: Date.now},
        favoriteShow : String,
        reviews      : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
        showlists    : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Showlist' }],
        badges       : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],
        features     : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feature' }]

    }  

});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
