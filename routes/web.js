const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const monhgoose = require('mongoose');

// Controllers
const { auth, loginPageDisplay } = require('../Controllers/auth/LoginController');
const { registrationPageDisplay, registerPost } = require('../Controllers/auth/RegistrationController');
const { homePageDisplay } = require('../Controllers/HomeController');
const { logOut } = require('../Controllers/auth/LogoutController');
const { saveBank } = require('../Controllers/api/BankController');
const { saveItem, deleteItem } = require('../Controllers/api/ItemController');

// Register page
router.get('/registration', registrationPageDisplay);
router.post('/registration', registerPost);

// Login page
router.get('/login', loginPageDisplay);
router.post('/login', auth);

// Home
router.get('/home', homePageDisplay);

// Logout
router.get('/logout', logOut);

// Save bank
router.post('/api/v1/bank/save', saveBank);

// Items
router.post('/api/v1/item/save', saveItem);
router.post('/api/v1/item/delete', deleteItem);

module.exports = router;
