var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

//var db = mongoose.connect('mongodb://localhost:27017/bookAPI');
var db;

if(process.env.ENV == 'Test'){
	console.log('test env');

	db = mongoose.connect('mongodb://localhost:27017/bookAPI_test');
}
else{
console.log('production env');
	db = mongoose.connect('mongodb://localhost:27017/bookAPI');
	
}	

var app = express();

var Book = require('./models/bookModel')
var port = process.env.PORT || 33013;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var bookRouter = require('./routes/bookRoutes')(Book);

	
	
app.use('/api/books', bookRouter);


app.get('/', function(req, res){
	res.send('<h1>welcom to my API! </h1>');
});

app.listen(port, function(){
	console.log('Running on port..: ' + port);
});

module.exports = app;