const User = require('./models/user');
const Show = require('./models/show');
const Showlist = require('./models/showlist');

module.exports = function(app, passport){

	app.get('/showlists', function(req, res) {
        res.render('showlists.ejs', {user: req.user});
    });

    app.post('/showlist', function(req,res){
        var body = req.body;
        body.shows = [];
        var count = 0;
        var shows = true;
        while(shows){
            if(req.body.hasOwnProperty('showID_'+count)){
                body.shows.push({
                    showId: req.body['showID_'+count],
                    showDate: req.body['showDate_'+count],
                    showNotes: req.body['showNotes_'+count]
                });
                count++;
            } else {
                shows = false;
            }
        }
        var showlist = new Showlist({
            id: req.params.id,
            userId: body.userId,
            showListTitle: body.showListTitle,
            showListDescription: body.showListDescription,
            showListType: body.showListType,
            public: body.public,
            shows: body.shows
        });
        showlist.save(function (err, newShowlist) {
        // res.status(201).send(newShowlist);
        res.redirect('/dashboard');
        });
    });


    app.get('/showlist', function(req, res) {
    Showlist.find({}, function(err, showlists) {
        if(err) {
            res.status(500).send(err);
        } else {   
        res.send(showlists);
        }
        });
    });

    app.get('/create-showlist', isLoggedIn, function(req, res) {
    Show.find({},null,{sort: {showTitle:1}}, function(err, shows) {
        if(err) {
            res.status(500).send(err);
        } else {
            res.render('create-showlist.ejs', {shows: shows, user: req.user});
        }
        });
    });  

}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}