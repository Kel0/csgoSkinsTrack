const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 80;
const bodyParser = require('body-parser')
const session = require('express-session');

const app = express();
const dbUrl = require('./database/db');
const web = require('./routes/web');
const path = require('path');


// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//use sessions for tracking logins
app.use(session({
  secret: 'zjLe7UBR',
  resave: true,
  saveUninitialized: false
}));

// Mongoose cfg
mongoose.set('useFindAndModify', true);

// Routes
app.use(web);

const start = async () => {
	await mongoose.connect(dbUrl.url, { 
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	});

	app.listen(PORT);
	console.log(`Started on ${ PORT } port`);
}

start();
