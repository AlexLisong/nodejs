var bookController = function(Book){


var post = function(req,res){
		var book = new Book(req.body);
		if(req.body.title){
		console.log(book);
		book.save();
		res.status(201);
		res.send(book);
		}else{
			res.status(400);
			res.send('Title is required');
		}
		
}
var get = function(req,res){
		/*
		var responseJson = { hello: "This is my api" };		
		res.json(responseJson);
		*/
		
		var query = {};
		if(req.query.read)
		{
			query.read = req.query.read
		}
		Book.find(query, function(err, books){
			if(err){
				res.status(500).send(err);
			}else{
						console.log('qqq');
				res.json(books);
			}
		});
	}
	
	return {
		post:post,
		get:get
		}
}

module.exports = bookController
