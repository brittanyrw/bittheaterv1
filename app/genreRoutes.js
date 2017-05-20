const Feature = require('./models/feature');
const Genre = require('./models/genre');
const Badge = require('./models/badges');
const Review = require('./models/review');
const Show = require('./models/show');
const User = require('./models/user');
const Showlist = require('./models/showlist');

module.exports = function(app, passport){

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

    app.put('/genres/:id', function(req, res) {
    Genre.findById({_id: req.params.id}, function (err, genre) {  
        if (err) {
            res.status(500).send(err);
        } else {
            genre.title = req.body.title;
            genre.slug = req.body.slug;
            genre.save(function (err, genre) {
                if (err) {
                    res.status(500).send(err)
                }
                res.send(genre);
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