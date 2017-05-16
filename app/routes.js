// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}

const Feature = require('./models/feature');
const Genre = require('./models/genre');
const Badge = require('./models/badges');
const Review = require('./models/review');
const Show = require('./models/show');
const User = require('./models/user');
const Showlist = require('./models/showlist');

const userRoutes = require('./userRoutes.js');
const showRoutes = require('./showRoutes.js');
const reviewRoutes = require('./reviewRoutes.js');
const showListsRoutes = require('./showListsRoutes.js');
const badgeRoutes = require('./badgeRoutes.js');
const genreRoutes = require('./genreRoutes.js');
const featureRoutes = require('./featureRoutes.js');

module.exports = function(app, passport) {

    userRoutes(app, passport);
    showRoutes(app, passport);
    reviewRoutes(app, passport);
    showListsRoutes(app, passport);
    badgeRoutes(app, passport);
    genreRoutes(app, passport);
    featureRoutes(app, passport);

    app.get('/', function(req, res) {
        res.render('index.ejs', {user: req.user});
    });


    // PROFILE AND DASHBOARD SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });

    app.get('/create-profile', /*isLoggedIn,*/ function(req, res) {
        res.render('create-profile.ejs', { user : req.user });
    });

    app.get('/dashboard', isLoggedIn, function(req, res) {
        var showsObj = {};
        var badgesObj = {};
        Review.find({"userId" : req.user.id}, function(err, reviews) {
            if(err) {
                res.status(500).send(err);
            } else {
                Showlist.find({}, function(showlistErr, showlists){
                    if(showlistErr){
                        res.status(500).send(showlistErr);
                    } else {
                        User.findOne({_id: req.user._id},function(userErr, user){
                            if(userErr){
                                res.status(500).send(userErr);
                            } else {
                                Badge.find({_id:{$in:user.badges}},function(badgeE,badges) {
                                    if(badgeE){
                                        res.status(500).send(badgeE);
                                    } else {
                                        for (var i = 0; i < badges.length; i++) {
                                        badgesObj[badges[i]._id] = badges[i];
                                        }
                                    Show.find({},function(showE,shows){
                                        if(showE){
                                            res.status(500).send(showE);
                                        } else {
                                            for (var i = 0; i < shows.length; i++) {
                                                showsObj[shows[i]._id] = shows[i].showTitle;
                                            } res.render('dashboard.ejs', {reviews: reviews, showlists: showlists, shows: showsObj, user: user, badges: badgesObj});   
                                            }
                                    });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage'), user: req.user });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/dashboard', // redirect to the user's dashboard
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage'), user: req.user  });
        });

        app.get('/signup-complete', function(req, res) {
            res.render('signup-complete.ejs', { message: req.flash('signupMessage'), user: req.user  });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/dashboard', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

        // handle the callback after twitter has authenticated the user
        app.get('/auth/twitter/callback',
            passport.authenticate('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('connect-local.ejs', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

        // handle the callback after twitter has authorized the user
        app.get('/connect/twitter/callback',
            passport.authorize('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn, function(req, res) {
        var user           = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });
};
