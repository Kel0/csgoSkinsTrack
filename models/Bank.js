const { Schema, model } = require('mongoose');

const schema = new Schema({
	user_id: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},

	bankValue: {
		type: Number,
		required: true, 
	},

	currType: {
		type: String,
		required: true
	}
});


module.exports = model("Bank", schema);