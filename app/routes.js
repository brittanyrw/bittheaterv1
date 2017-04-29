const User = require('./models/user');
const Feature = require('./models/feature');
const Genre = require('./models/genre');
const Badge = require('./models/badges');
const Review = require('./models/review');
const Show = require('./models/show');
const Showlist = require('./models/showlist');


module.exports = function(app, passport) {

    app.get('/users', function(req, res) {
    User.find({}, function(err, users) {
       if(err) res.send(err);
       res.send(users);
       });
    });

    app.get('/users/:id', function(req, res) {
    User.findById({_id: req.params.id}, function(err, users) {
        if(err) {
            res.status(500).send(err);
        } else {
        res.send(users);
        }
        });
    });

    app.get('/review', function(req, res) {
        //$limit: 5, $sort: {date:-1}
    Review.find({}, function(err, reviews) {
        if(err) {
            res.status(500).send(err);
        } else {
            // res.send(reviews);
            Genre.find({}, function(genreErr, genres){
                if(genreErr){
                    res.status(500).send(genreErr);
                } else {
                    res.render('reviews.ejs', {reviews: reviews, genres: genres});        
                }
            })
            
        }
        });
    });


    app.get('/review/:id', function(req, res) {
    Review.findById({_id: req.params.id}, function(err, reviews) {
        if(err) {
            res.status(500).send(err);
        } else {        
        res.send(reviews);
        }
        });
    });

    app.post('/review', function(req, res) {
    var review = new Review(req.body);
    review.save(function (err, newReview) {
        res.status(201).send(newReview);
        });
    });

    app.delete('/review/:id', function(req, res) {
    Review.remove({_id: req.params.id}, function(err, reviews) {
        res.send({ message: `Successfully deleted \`${req.body.title}\``, reviews});
        });
    })

    app.get('/shows', function(req, res) {
    Show.find({}, function(err, shows) {
        if(err) {
            res.status(500).send(err);
        } else {   
       res.send(shows);
        }
       });
    });   

    app.get('/shows/:id', function(req, res) {
    Show.findById({_id: req.params.id}, function(err, shows) {
        if(err) {
            res.status(500).send(err);
        } else {   
        res.send(shows);
        }
        });
    });

    app.post('/shows', function(req, res) {
    var show = new Show(req.body);
    show.save(function (err, newShow) {
        res.status(201).send(newShow);
        });
    });

    app.delete('/shows/:id', function(req, res) {
    Show.remove({_id: req.params.id}, function(err, shows) {
        console.log(req.body);
        res.send({ message: `Successfully deleted \`${req.body.title}\``, shows});
        });
    })

    app.get('/badge', function(req, res) {
    Badge.find({}, function(err, badges) {
        if(err) {
            res.status(500).send(err);
        } else {   
       res.send(badges);
        }
       });
    });   

    app.get('/badge/:id', function(req, res) {
    Badge.findById({_id: req.params.id}, function(err, badges) {
        if(err) {
            res.status(500).send(err);
        } else {   
        res.send(badges);
        }
        });
    });

    app.post('/badge', function(req, res) {
    var badge = new Badge(req.body);
    Badge.save(function (err, newBadge) {
        res.status(201).send(newBadge);
        });
    });

    app.delete('/badge/:id', function(req, res) {
    Badge.remove({_id: req.params.id}, function(err, badges) {
        console.log(req.body);
        res.send({ message: `Successfully deleted \`${req.body.title}\``, badges});
        });
    })

    app.get('/feature', function(req, res) {
    Feature.find({}, function(err, features) {
        if(err) {
            res.status(500).send(err);
        } else {   
       res.send(features);
        }
       });
    });   

    app.get('/genres', function(req, res) {
    Genre.find({}, function(err, genres) {
        if(err) {
            res.status(500).send(err);
        } else {   
       res.send(genres);
        }
       });
    }); 

    app.post('/genres', function(req, res) {
    var genre = new Genre(req.body);
    genre.save(function (err, newGenre) {
        res.status(201).send(newGenre);
        });
    });

    app.get('/feature/:id', function(req, res) {
    Feature.findById({_id: req.params.id}, function(err, features) {
        if(err) {
            res.status(500).send(err);
        } else {   
        res.send(features);
        }
        });
    });

    app.post('/feature', function(req, res) {
    var feature = new Feature(req.body);
    Feature.save(function (err, newFeature) {
        res.status(201).send(newFeature);
        });
    });

    app.delete('/feature/:id', function(req, res) {
    Feature.remove({_id: req.params.id}, function(err, features) {
        console.log(req.body);
        res.send({ message: `Successfully deleted \`${req.body.title}\``, features});
        });
    })

    //put requests - findByIdAndUpdate

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    //show main homepages (for users that are not logged in)
    app.get('/reviews', function(req, res) {
        res.render('reviews.ejs');
    });

    app.get('/features', function(req, res) {
        res.render('features.ejs');
    });

    app.get('/badges', function(req, res) {
        res.render('badges.ejs');
    });

    app.get('/showlists', function(req, res) {
        res.render('showlists.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });

    app.get('/dashboard', isLoggedIn, function(req, res) {
        res.render('dashboard.ejs', {
            user : req.user
        });
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // WRITE REVIEWS, FEATURES, CREATE LISTS =========================

    // app.get('/write-review'/*, isLoggedIn*/, function(req, res) {
    //     res.render('write-review.ejs', {
    //         //user : req.user - append user id onto route or hide user id in form
    //     });
    // });


    app.get('/write-review'/*, isLoggedIn*/, function(req, res) {
    Show.find({},null,{sort: {showTitle:1}}, function(err, shows) {
        if(err) {
            res.status(500).send(err);
        } else {
            Genre.find({}, function(genreErr, genres){
                if(genreErr){
                    res.status(500).send(genreErr);
                } else {
                    res.render('write-review.ejs', {shows: shows, genres: genres});        
                }
            })
            
        }
        });
    });



    app.get('/write-feature'/*, isLoggedIn*/, function(req, res) {
    Review.find({},null,{sort: {published:1}}, function(err, reviews) {
        if(err){
            res.status(500).send(err);
        } else {
            res.render('write-feature.ejs', {reviews: reviews});
            //user : req.user
        }
    })    
        // res.render('write-feature.ejs', {
        //     //user : req.user
        // });
    });

    app.get('/create-showlist'/*, isLoggedIn*/, function(req, res) {
    Show.find({},null,{sort: {showTitle:1}}, function(err, shows) {
        if(err) {
            res.status(500).send(err);
        } else {
            res.render('create-showlist.ejs', {shows: shows});
        }
        });
    });    


    app.get('/badge', function(req, res){
        var query = Badge.find({title: req.user._id});
            query.select('title');
            query.exec(function(err, badges) {
                if (err) throw err;

            res.json(badges);
        });
    });





// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        app.get('/signup-complete', function(req, res) {
            res.render('signup-complete.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/signup-complete', // redirect to the secure profile section
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

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
