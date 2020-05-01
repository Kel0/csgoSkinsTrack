const Bank = require('../../models/Bank');

const saveBank = async (req, res) => {
	if ( req.session.auth ) {
		const {
			bankValue,
			currType
		} = req.body;

		const bankCreds = new Bank({
			user_id: req.session.auth._id,
			bankValue: bankValue,
			currType: currType
		});

		Bank.findOneAndUpdate({ user_id: req.session.auth._id }, {
			user_id: req.session.auth._id, 
			bankValue: bankValue, 
			currType: currType
		}, { upsert: true })
		.then(doc => {
			return res.send(JSON.stringify({ status_code: 301 }));
		})
		.catch(err => {
			if (err) throw err;
		});

<<<<<<< HEAD
		//comment of my life I GUESS
=======
		//comment of my kife
>>>>>>> eb9385c1e2796a6490afcf56c079fa5ff6d02773
	}
}


module.exports = {
	"saveBank": saveBank
}