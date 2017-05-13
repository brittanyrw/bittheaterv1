const Feature = require('./models/feature');
const Genre = require('./models/genre');
const Badge = require('./models/badges');
const Review = require('./models/review');
const Show = require('./models/show');
const User = require('./models/user');
const Showlist = require('./models/showlist');

module.exports = function(app, passport){

	app.get('/review', function(req, res) {
    Review.find({}, function(err, reviews) {
        if(err) {
            res.status(500).send(err);
        } else {   
       res.send(reviews);
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
        // res.status(201).send(newReview);
        res.redirect('/dashboard');
        });
    });



function checkReviewBadges(useriId){
    // go and get all of the users badges of type review
    // go and get all badges of type review
    // loop over all badges, elminimate the ones that the user already has
    // loop through the ones the user doesn't have
    // compare the number to the number of reviews the user has written
}


    //check badge function after a review is posted

    app.delete('/reviews/:id', function(req, res) {
    Review.remove({_id: req.params.id}, function(err, reviews) {
        res.send({ message: `Successfully deleted \`${req.body.title}\``, reviews});
        });
    })

app.get('/write-review', isLoggedIn, function(req, res) {
    Show.find({},null,{sort: {showTitle:1}}, function(err, shows) {
        if(err) {
            res.status(500).send(err);
        } else {
            Genre.find({}, function(genreErr, genres){
                if(genreErr){
                    res.status(500).send(genreErr);
                } else {
                    res.render('write-review.ejs', {shows: shows, genres: genres, user: req.user}); 
                    console.log(req.user);       
                }
            })
            
        }
        });
});

app.get('/reviews', function(req, res) {
        //$limit: 5, $sort: {date:-1}
        var showsObj = {};
        var showsCategoryObj = {};
        var showsLocationObj = {};
        Review.find({}, function(err, reviews) {
            if(err) {
                res.status(500).send(err);
            } else {
                // res.send(reviews);
                Genre.find({}, function(genreErr, genres){
                    if(genreErr){
                        res.status(500).send(genreErr);
                    } else {
                        User.find({},function(userErr, users){
                            if(userErr){
                                res.status(500).send(userErr);
                            } else {
                                Show.find({},function(showE,shows){
                                    if(showE){
                                        res.status(500).send(showE);
                                    } else {
                                        for (var i = 0; i < shows.length; i++) {
                                            showsObj[shows[i]._id] = shows[i].showTitle;
                                            showsCategoryObj[shows[i]._id] = shows[i].showCategory;
                                            showsLocationObj[shows[i]._id] = shows[i].showCity;
                                        } res.render('reviews.ejs', {reviews: reviews, genres: genres, shows: showsObj, category: showsCategoryObj, location: showsLocationObj, user: req.user});
                                        console.log(showsLocationObj);        
                                        }
                                });
                            }
                        });
                    }
                });
            }
        });
    });
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}