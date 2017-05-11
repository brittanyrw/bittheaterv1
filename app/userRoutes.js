const User = require('./models/user');

module.exports = function(app, passport){

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
    
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}