const Feature = require('./models/feature');
const Genre = require('./models/genre');
const Badge = require('./models/badges');
const Review = require('./models/review');
const Show = require('./models/show');
const User = require('./models/user');
const Showlist = require('./models/showlist');

module.exports = function(app, passport){

	app.get('/features', function(req, res) {
        res.render('features.ejs', {user: req.user});
    });

	app.get('/feature', function(req, res) {
    Feature.find({}, function(err, features) {
        if(err) {
            res.status(500).send(err);
        } else {   
       res.send(features);
        }
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
    }); 

    app.get('/write-feature', isLoggedIn, function(req, res) {
    Review.find({"userId" : req.user.id}, function(err, reviews) {
        if(err) {
            res.status(500).send(err);
        } else {
            res.render('write-feature.ejs', {reviews: reviews, user: req.user});      
                }
        })
    });

    app.put('/feature/:id', function(req, res) {
    Feature.findById({_id: req.params.id}, function (err, feature) {  
        if (err) {
            res.status(500).send(err);
        } else {
            feature.featureTitle = req.body.featureTitle;
            feature.featureSubTitle = req.body.featureSubTitle;
            feature.featureContent = req.body.featureContent;
            feature.public = req.body.public;
            feature.save(function (err, feature) {
                if (err) {
                    res.status(500).send(err)
                }
                res.send(feature);
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