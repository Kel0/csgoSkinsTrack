const { Schema } = require('mongoose');
const { model } = require('mongoose');

const schema = new Schema({
	email: {
		type: String,
		unique: true,
	    required: true,
	    trim: true
	},

	password: {
		type: String, 
	    required: true,
	},

	created_at: {
		type: Number,
		required: true
	}
});

module.exports = model("User", schema);
