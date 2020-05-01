const Bank = require('../../models/Bank');

const saveBank = (req, res) => {
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

		}, { upsert: true }, (err, doc) => {
				if (err) throw err;
				return res.send(JSON.stringify({ status_code: 301 }));
			});
	}
}


module.exports = {
	"saveBank": saveBank
}