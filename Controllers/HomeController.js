const Bank = require('../models/Bank');
const Item = require('../models/Item');

const homePageDisplay = async (req, res) => {
	if ( req.session.auth ) {
		const userInfo = req.session.auth;
		const BankUser = await Bank.findOne({ user_id: userInfo._id }).exec();
		const Items = await Item.find({ user_id: userInfo._id }).exec();

		let bankValue = (BankUser !== null ? BankUser.bankValue : 0);
		let bankCurr = (BankUser !== null ? BankUser.currType : "USD");

		res.render('home', {
			title: "Home page", 
			user: userInfo,
			isHome: true,
			bankValueInform: bankValue,
			bankCurrInform: bankCurr,
			items: Items
		});

	} else {
		res.redirect('/login');
	}
}

module.exports = {
	"homePageDisplay": homePageDisplay
}