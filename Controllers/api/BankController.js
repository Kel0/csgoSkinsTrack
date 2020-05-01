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

		//comment of my life I GUESS
	}
}


module.exports = {
	"saveBank": saveBank
}