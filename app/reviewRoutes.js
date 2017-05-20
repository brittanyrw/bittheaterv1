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

    // app.get('/checkbadges',isLoggedIn,function(req,res){
    //     User.findOne({_id:req.user._id},function(err,user){
    //         user.badges = [];
    //         user.save(function(e,d){
    //             res.redirect('/dashboard');
    //         });
    //     });
    // });

    app.post('/review', function(req, res) {
    var review = new Review(req.body);
        review.save(function (err, newReview) {
        // res.status(201).send(newReview);
            User.findOne({_id: req.user._id}, function(err, user) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    Review.find({userId:req.user._id},function(re,reviews){ // TODO - find a way to just get back a count
                        if(!re){
                            var userReviews = reviews.length;
                            Badge.find({_id: {$nin: user.badges},type:'Review'},function(berror,badges){
                                if(!berror){
                                    for (var i = 0; i < badges.length; i++) {
                                        if(userReviews >= badges[i].number){
                                            user.badges.push(badges[i]._id);
                                        }
                                    }
                                    user.save(function(saveErr,finalUser){
                                        res.redirect('/dashboard');
                                    });
                                } else {
                                    res.send(e2);
                                }
                            });
                        } else {
                            res.send(re);
                        }
                    });
                    
                }
            });
        });
    });      


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
        var showsTypeObj = {};
        Review.find({'public' : 'true'}, function(err, reviews) {
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
                                            showsTypeObj[shows[i]._id] = shows[i].showType;
                                        } res.render('reviews.ejs', {reviews: reviews, genres: genres, shows: showsObj, category: showsCategoryObj, location: showsLocationObj, type: showsTypeObj, user: req.user});     
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