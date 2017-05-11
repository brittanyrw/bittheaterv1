const Feature = require('./models/feature');
const Genre = require('./models/genre');
const Badge = require('./models/badges');
const Review = require('./models/review');
const Show = require('./models/show');
const User = require('./models/user');
const Showlist = require('./models/showlist');

module.exports = function(app, passport){

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
	
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}