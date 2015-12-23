var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	

var bookModel = new Schema({
	title: {
		type: String
	},
	read: {type: Boolean, default: false}
});

module.exports = mongoose.model('Book', bookModel);
