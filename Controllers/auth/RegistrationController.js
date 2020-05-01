const User = require('../../models/User');
const monhgoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const registrationPageDisplay =  (req, res) => {
	if ( !req.session.auth ) {
	    res.render('auth/registration', {
	    	title: "Register page",
	    	isReg: true
	    });
	} else {
		res.redirect('/home')
	}
} 

const registerPost = async (req, res) => {
	if ( !req.session.auth ) {
		const {
			email,
			password
		} = req.body;

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const user = new User({
			email,
			password: hash,
			created_at: Date.now()
		});

		await user.save();
		res.redirect('/login');
	} else {
		res.redirect('/home');
	}
}

module.exports = {
	"registrationPageDisplay": registrationPageDisplay,
	"registerPost": registerPost
}