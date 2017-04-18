var mongoose = require('mongoose');

var genreSchema = mongoose.Schema({

        title         	: { type : String , unique : true, required : true, dropDups: true }, // Comedy, slug: comedy.      title: Romantic Comedy, slug: romantic-comedy
        slug			: { type : String , unique : true, required : true, dropDups: true }
        
		//	bittheatre.com/reviews/by-genre/romantic-comedy
		//	app.get('/reviews/by-genre/:slug',function(req,res){
		//		
		//		Genre.findOne({slug:req.params.slug},function(err,genre){})
		//	})
        
});

//create function that updates slug on save and update

module.exports = mongoose.model('Genre', genreSchema);