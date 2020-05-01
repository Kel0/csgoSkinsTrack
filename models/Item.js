const { Schema, model } = require('mongoose');

const schema = new Schema({
	user_id: {
		type: String,
		required: true,
		trim: true,
	},

	itemName: {
		type: String,
		required: true,
		trim: true
	},

	boughtPrice: {
		type: Number,
		required: true
	},

	expectedPrice: {
		type: Number,
		required: true
	},

	itemCount: {
		type: Number,
		required: true
	},

	marketPrice: {
		type: Number,
	}
});

module.exports = model("Item", schema);
