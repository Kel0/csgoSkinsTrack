const Item = require('../../models/Item');

const saveItem = async (req, res) => {
	const {
		itemName,
		boughtPrice,
		expPrice,
		itemCount
	} = req.body;

	const ItemObj = new Item({
		user_id: req.session.auth._id,
		itemName: itemName,
		boughtPrice: boughtPrice,
		expectedPrice: expPrice,
		itemCount: itemCount
	}); 

	await ItemObj.save();
	console.log(ItemObj._id);
	res.end(JSON.stringify({ "itemId": ItemObj._id }));
}


const deleteItem = async (req, res) => {
	const {
		itemId
	} = req.body;

	await Item.findOneAndRemove({ _id: itemId }).exec();
	res.end(JSON.stringify({ status: 301 }));
}

module.exports = {
	"saveItem": saveItem,
	"deleteItem": deleteItem
}