module.exports.logOut = (req, res) => {
	try {
		if ( req.session.auth ) {
			delete req.session.auth;
			res.redirect('/login');
		} else {
			res.redirect('/login');
		}
	} catch (e) {
		console.log(e);
	}
}