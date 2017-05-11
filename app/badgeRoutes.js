const Feature = require('./models/feature');
const Genre = require('./models/genre');
const Badge = require('./models/badges');
const Review = require('./models/review');
const Show = require('./models/show');
const User = require('./models/user');
const Showlist = require('./models/showlist');

module.exports = function(app, passport){

    app.get('/badges', function(req, res) {
        res.render('badges.ejs', {user: req.user});
    });

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
	
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}