const User = require('../../models/User');
const bcrypt = require('bcryptjs');

const loginPageDisplay = (req, res) => {
  if ( !req.session.auth ) {
    res.render('auth/login', {
      title: "Login page",
      isLogin: true
    });
  } else {
    res.redirect('/home');
  }
}

const auth = (req, res) => {
  if ( !req.session.auth ) {
    const {
      email,
      password
    } = req.body;

    if ( email && password ) {
      const user = User.findOne({ email: email }, (err, user) => {
        if (err) throw err;

        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          
          if ( result ) {
            req.session.auth = user;
            res.redirect('/home');
          } else {
            return callback();
          }

        });
      });
    }

  } else {
    res.redirect('/home');
  }
}

module.exports = {
  'loginPageDisplay': loginPageDisplay,
  'auth': auth
}